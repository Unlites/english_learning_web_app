package repository

import (
	"fmt"

	"github.com/Unlites/english_learning_web_app/pkg/models"
	"github.com/jmoiron/sqlx"
)

type SessionPostgres struct {
	db *sqlx.DB
}

func NewSessionPostgres(db *sqlx.DB) *SessionPostgres {
	return &SessionPostgres{db: db}
}

func (r *SessionPostgres) GetCurrent(userId int) (string, error) {
	var words string
	query := fmt.Sprintf("SELECT current_words FROM %s WHERE id = $1", usersTable)
	err := r.db.Get(&words, query, userId)

	return words, err
}

func (r *SessionPostgres) ResetCurrent(userId int) error {
	query := fmt.Sprintf("UPDATE %s SET current_words = '' WHERE id = $1", usersTable)
	_, err := r.db.Exec(query, userId)

	return err
}

func (r *SessionPostgres) AddToCurrent(userId int, word models.Word) error {
	currentWords, err := r.GetCurrent(userId)
	if err != nil {
		return err
	}
	input := currentWords + "," + word.Word
	query := fmt.Sprintf("UPDATE %s SET current_words = $1 WHERE id = $2", usersTable)
	_, err = r.db.Exec(query, input, userId)

	return err
}
