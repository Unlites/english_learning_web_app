package handler

import (
	"net/http"
	"strings"

	"github.com/Unlites/english_learning_web_app/pkg/models"
	"github.com/gin-gonic/gin"
)

// Sign Up. Takes username and password and creates user.
func (h *Handler) signUp(c *gin.Context) {
	var input models.User
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	id, err := h.services.Auth.CreateUser(input)
	if err != nil {
		if strings.Contains(err.Error(), "dublicate") {
			newErrorResponse(c, http.StatusBadRequest, err.Error())
			return
		}
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id": id,
	})

}

type singInInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Sign In with JWT and setting cookie.
func (h *Handler) signIn(c *gin.Context) {
	var input singInInput

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	token, err := h.services.Auth.GenerateToken(input.Username, input.Password)
	if err != nil {
		if strings.Contains(err.Error(), "no rows") {
			newErrorResponse(c, http.StatusForbidden, err.Error())
			return
		}
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.SetCookie("jwt", token, 86400, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

// Logout, removing token from cookie.
func (h *Handler) logout(c *gin.Context) {
	c.SetCookie("jwt", "", -1, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}
