package repository

import (
	"errors"
	"fmt"
	"strings"

	"github.com/Unlites/english_learning_web_app/pkg/models"
	"github.com/jmoiron/sqlx"
)

type WordPostgres struct {
	db *sqlx.DB
}

func NewWordPostgres(db *sqlx.DB) *WordPostgres {
	return &WordPostgres{db: db}
}

func (r *WordPostgres) Create(userId, typeId int, word models.Word) (int, error) {
	var wordExist string
	query := fmt.Sprintf("SELECT word FROM %s WHERE user_id = $1 AND word = $2", wordsTable)
	var id int
	err := r.db.Get(&wordExist, query, userId, word.Word)
	if err == nil {
		return 0, errors.New("word already exists")
	}
	query = fmt.Sprintf("INSERT INTO %s (user_id, type_id, word, translation) values ($1, $2, $3, $4) RETURNING id", wordsTable)
	row := r.db.QueryRow(query, userId, typeId, word.Word, word.Translation)
	if err := row.Scan(&id); err != nil {
		return 0, err
	}
	return id, nil
}

func (r *WordPostgres) GetAll(userId, typeId int) ([]models.Word, error) {
	var words []models.Word
	query := fmt.Sprintf("SELECT * FROM %s WHERE user_id = $1 AND type_id = $2", wordsTable)
	err := r.db.Select(&words, query, userId, typeId)

	return words, err
}

func (r *WordPostgres) GetById(userId, wordId int) (models.Word, error) {
	var word models.Word
	query := fmt.Sprintf("SELECT * FROM %s WHERE user_id = $1 AND id = $2", wordsTable)
	err := r.db.Get(&word, query, userId, wordId)

	return word, err
}

func (r *WordPostgres) GetByWord(userId int, input string) (models.Word, error) {
	var word models.Word
	query := fmt.Sprintf("SELECT * FROM %s WHERE user_id = $1 AND word = $2", wordsTable)
	err := r.db.Get(&word, query, userId, input)

	return word, err
}

func (r *WordPostgres) GetRandomWordByPriority(userId, typeId, priority int) (models.Word, error) {
	var word models.Word
	query := fmt.Sprintf("SELECT * FROM %s WHERE user_id = $1 AND type_id = $2 AND priority = $3 ORDER BY random() LIMIT 1", wordsTable)
	err := r.db.Get(&word, query, userId, typeId, priority)
	if err != nil {
		if strings.Contains(err.Error(), "no rows in result set") {
			query := fmt.Sprintf("SELECT * FROM %s WHERE user_id = $1 AND type_id = $2 AND priority = 0 ORDER BY random() LIMIT 1", wordsTable)
			err = r.db.Get(&word, query, userId, typeId)
		}
	}

	return word, err
}

func (r *WordPostgres) Delete(userId, wordId int) error {
	query := fmt.Sprintf("DELETE FROM %s WHERE user_id = $1 AND id = $2", wordsTable)
	_, err := r.db.Exec(query, userId, wordId)

	return err
}

func (r *WordPostgres) Update(userId, wordId int, word models.Word) error {
	query := fmt.Sprintf("UPDATE %s SET word = $1, translation = $2 WHERE user_id = $3 AND id = $4", wordsTable)
	_, err := r.db.Exec(query, word.Word, word.Translation, userId, wordId)

	return err
}

func (r *WordPostgres) PatchPriority(userId, wordId, priority int) error {
	query := fmt.Sprintf("UPDATE %s SET priority = $1 WHERE user_id = $2 AND id = $3", wordsTable)
	_, err := r.db.Exec(query, priority, userId, wordId)

	return err
}
