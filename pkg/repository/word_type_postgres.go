package repository

import (
	"fmt"

	"github.com/Unlites/english_learning_web_app/pkg/models"
	"github.com/jmoiron/sqlx"
)

type WordTypePostgres struct {
	db *sqlx.DB
}

func NewWordTypePostgres(db *sqlx.DB) *WordTypePostgres {
	return &WordTypePostgres{db: db}
}

func (r *WordTypePostgres) Create(wordType models.WordType) (int, error) {
	var id int
	query := fmt.Sprintf("INSERT INTO %s (type) values ($1) RETURNING id", typesTable)
	row := r.db.QueryRow(query, wordType.Type)
	if err := row.Scan(&id); err != nil {
		return 0, err
	}
	return id, nil
}

func (r *WordTypePostgres) GetAll() ([]models.WordType, error) {
	var types []models.WordType
	query := fmt.Sprintf("SELECT * FROM %s", typesTable)
	err := r.db.Select(&types, query)

	return types, err
}

func (r *WordTypePostgres) GetById(id int) (string, error) {
	var wordType models.WordType
	query := fmt.Sprintf("SELECT type FROM %s WHERE id = $1", typesTable)
	err := r.db.Get(&wordType, query, id)

	return wordType.Type, err
}
