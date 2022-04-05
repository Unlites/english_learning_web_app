package service

import (
	"strings"

	"github.com/Unlites/english_learning_web_app/pkg/models"
	"github.com/Unlites/english_learning_web_app/pkg/repository"
)

type SessionService struct {
	repo repository.Session
}

func NewSessionService(repo repository.Session) *SessionService {
	return &SessionService{repo: repo}
}

func (s *SessionService) GetCurrent(userId int) ([]string, error) {
	words, err := s.repo.GetCurrent(userId)
	if err != nil {
		return nil, err
	}
	return strings.Split(words, ","), nil
}

func (s *SessionService) Reset(userId int) error {
	return s.repo.ResetCurrent(userId)
}

func (s *SessionService) AddToCurrent(userId int, word models.Word) error {
	return s.repo.AddToCurrent(userId, word)
}
