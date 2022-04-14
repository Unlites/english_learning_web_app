package handler

import (
	"github.com/Unlites/english_learning_web_app/pkg/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

// Handler to work with incoming requests.
type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.Default()

	// CORS Settings.
	router.Use(cors.New(cors.Config{
		AllowMethods:     []string{"PATCH", "DELETE", "PUT"},
		AllowOrigins:     []string{viper.GetString("client_url")},
		AllowCredentials: true,
		AllowHeaders:     []string{"Content-Type"},
	}))

	// Auth routes.
	auth := router.Group("/auth")
	{
		auth.POST("/sign_up", h.signUp)
		auth.POST("/sign_in", h.signIn)
		auth.POST("/logout", h.logout)
	}

	// App logic.
	api := router.Group("/api", h.userIndentity)
	{
		// Reset session (delete current words from db.)
		api.GET("/reset", h.resetSession)

		// Routes to work with words.
		wordlist := api.Group("/wordlist")
		{
			types := wordlist.Group("/types")
			{
				types.POST("/", h.createType)
				types.GET("/", h.getAllTypes)
				types.GET("/:type_id", h.getTypeById)

				words := types.Group("/:type_id")
				{
					words.POST("/words", h.createWord)
					words.GET("/words", h.getAllWords)

					// Priority needs to provide recently added words first.
					priority := types.Group(":type_id/words")
					{
						priority.GET("/:priority", h.getWordByPriority)
					}

				}
			}
			words := wordlist.Group("/words/")
			{
				words.GET("/:id", h.getWordById)
				words.PUT("/:id", h.updateWord)
				words.PATCH("/:id", h.patchWordPriority)
				words.DELETE("/:id", h.deleteWord)
				words.GET("/search/:word", h.getWordByWord)
			}
		}
	}
	return router
}
