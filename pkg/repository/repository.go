package repository

import (
	"github.com/Unlites/english_learning_web_app/pkg/models"
	"github.com/jmoiron/sqlx"
)

type Auth interface {
	CreateUser(user models.User) (int, error)
	GetUser(username, password string) (models.User, error)
}

type WordType interface {
	Create(wordType models.WordType) (int, error)
	GetAll() ([]models.WordType, error)
	GetById(id int) (string, error)
}

type Word interface {
	Create(userId, typeId int, wordType models.Word) (int, error)
	GetAll(userId, typeId int) ([]models.Word, error)
	GetById(userId, wordId int) (models.Word, error)
	GetByWord(userId int, input string) (models.Word, error)
	GetRandomWordByPriority(userId, typeId, priority int) (models.Word, error)
	Delete(userId, wordId int) error
	Update(userId, wordId int, word models.Word) error
	PatchPriority(userId, wordId, priority int) error
}

type Session interface {
	GetCurrent(userId int) (string, error)
	ResetCurrent(userId int) error
	AddToCurrent(userId int, word models.Word) error
}

type Repository struct {
	Auth
	WordType
	Word
	Session
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Auth:     NewAuthPostgres(db),
		WordType: NewWordTypePostgres(db),
		Word:     NewWordPostgres(db),
		Session:  NewSessionPostgres(db),
	}
}
