package service

import (
	"github.com/Unlites/english_learning_web_app/pkg/models"
	"github.com/Unlites/english_learning_web_app/pkg/repository"
)

type WordService struct {
	repo      repository.Word
	typesRepo repository.WordType
}

func NewWordService(repo repository.Word, typesRepo repository.WordType) *WordService {
	return &WordService{repo: repo, typesRepo: typesRepo}
}

func (s *WordService) Create(userId, typeId int, word models.Word) (int, error) {
	_, err := s.typesRepo.GetById(typeId)
	if err != nil {
		// type does not exist
		return 0, err
	}

	return s.repo.Create(userId, typeId, word)
}

func (s *WordService) GetAll(userId, typeId int) ([]models.Word, error) {
	return s.repo.GetAll(userId, typeId)
}

func (s *WordService) GetById(userId, wordId int) (models.Word, error) {
	return s.repo.GetById(userId, wordId)
}

func (s *WordService) GetRandomWordByPriority(userId, typeId, priority int) (models.Word, error) {
	return s.repo.GetRandomWordByPriority(userId, typeId, priority)
}

func (s *WordService) Delete(userId, wordId int) error {
	return s.repo.Delete(userId, wordId)
}

func (s *WordService) Update(userId, wordId int, word models.Word) error {
	_, err := s.repo.GetById(userId, wordId)
	if err != nil {
		// user has not this word
		return err
	}
	return s.repo.Update(userId, wordId, word)
}

func (s *WordService) PatchPriority(userId, wordId, priority int) error {
	_, err := s.repo.GetById(userId, wordId)
	if err != nil {
		// user has not this word
		return err
	}
	return s.repo.PatchPriority(userId, wordId, priority)
}
