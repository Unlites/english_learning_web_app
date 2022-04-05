package service

import (
	"github.com/Unlites/english_learning_web_app/pkg/models"
	"github.com/Unlites/english_learning_web_app/pkg/repository"
)

type WordTypeService struct {
	repo repository.WordType
}

func NewWordTypeService(repo repository.WordType) *WordTypeService {
	return &WordTypeService{repo: repo}
}

func (s *WordTypeService) Create(wordType models.WordType) (int, error) {
	return s.repo.Create(wordType)
}

func (s *WordTypeService) GetAll() ([]models.WordType, error) {
	return s.repo.GetAll()
}

func (s *WordTypeService) GetById(id int) (string, error) {
	return s.repo.GetById(id)
}
