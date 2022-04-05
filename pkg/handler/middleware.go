package handler

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	authHeader = "Authorization"
	userCtx    = "userId"
)

// Check user for authorization.
func (h *Handler) userIndentity(c *gin.Context) {
	cookie, err := c.Cookie("jwt")
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
	}

	userId, err := h.services.ParseToken(cookie)
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}
	c.Set(userCtx, userId)
}

// Get user id from context.
func (h *Handler) getUserId(c *gin.Context) (int, error) {
	id, ok := c.Get(userCtx)
	if !ok {
		newErrorResponse(c, http.StatusInternalServerError, "user id not found")
		return 0, errors.New("user not found")
	}

	idInt, ok := id.(int)
	if !ok {
		newErrorResponse(c, http.StatusInternalServerError, "user id is of invalid type")
		return 0, errors.New("user id not found")
	}

	return idInt, nil
}

// Check words to not repeat in current session.
func (h *Handler) Contains(slice []string, value string) bool {
	for _, n := range slice {
		if value == n {
			return true
		}
	}
	return false
}
