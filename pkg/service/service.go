package service

import (
	"github.com/Unlites/english_learning_web_app/pkg/models"
	"github.com/Unlites/english_learning_web_app/pkg/repository"
)

type Auth interface {
	CreateUser(user models.User) (int, error)
	GenerateToken(username, password string) (string, error)
	ParseToken(token string) (int, error)
}

type WordType interface {
	Create(wordType models.WordType) (int, error)
	GetAll() ([]models.WordType, error)
	GetById(id int) (string, error)
}

type Word interface {
	Create(userId, typeId int, word models.Word) (int, error)
	GetAll(userId, typeId int) ([]models.Word, error)
	GetById(userId, wordId int) (models.Word, error)
	GetByWord(userId int, input string) (models.Word, error)
	GetRandomWordByPriority(userId, typeId, priority int) (models.Word, error)
	Delete(userId, wordId int) error
	Update(userId, wordId int, input models.Word) error
	PatchPriority(userId, wordId, priority int) error
}

type Session interface {
	GetCurrent(userId int) ([]string, error)
	Reset(userId int) error
	AddToCurrent(userId int, word models.Word) error
}

type Service struct {
	Auth
	WordType
	Word
	Session
}

func NewService(repo *repository.Repository) *Service {
	return &Service{
		Auth:     NewAuthService(repo.Auth),
		WordType: NewWordTypeService(repo.WordType),
		Word:     NewWordService(repo.Word, repo.WordType),
		Session:  NewSessionService(repo.Session),
	}
}
