package models

type WordType struct {
	Id   int    `json:"id" db:"id"`
	Type string `json:"type" db:"type" binding:"required"`
}

type Word struct {
	Id          int    `json:"id" db:"id"`
	UserId      int    `json:"user_id" db:"user_id"`
	TypeId      int    `json:"type_id" db:"type_id"`
	Word        string `json:"word" db:"word" binding:"required"`
	Translation string `json:"translation" db:"translation" binding:"required"`
	Priority    int    `json:"priority" db:"priority"`
}

type WordPriority struct {
	Priority int `json:"priority" db:"priority"`
}
