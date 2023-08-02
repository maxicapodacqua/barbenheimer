package main

import (
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	spin_http "github.com/fermyon/spin/sdk/go/http"
	"github.com/fermyon/spin/sdk/go/redis"
)

func init() {

	// handler for the http trigger
	spin_http.Handle(func(w http.ResponseWriter, r *http.Request) {
		// addr is the environment variable set in `spin.toml` that points to the
		// address of the Redis server.
		addr := os.Getenv("REDIS_ADDRESS")

		// channel is the environment variable set in `spin.toml` that specifies
		// the Redis channel that the component will publish to.
		channel := os.Getenv("REDIS_CHANNEL")

		if r.Method != "POST" {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		defer r.Body.Close()
		payload, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Invalid payload", http.StatusUnprocessableEntity)
			return
		}
		sPayload := strings.ToLower(string(payload))

		log.Printf("payload: %v", sPayload)

		if sPayload != "barbie" && sPayload != "oppenheimer" {
			http.Error(w, "Invalid payload", http.StatusUnprocessableEntity)
			return
		}

		if err := redis.Publish(addr, channel, payload); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

	})
}

func main() {}
