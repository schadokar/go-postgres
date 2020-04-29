package models

// User schema of the user table
type User struct {
	ID       int64  `json:"id,omitempty"`
	Name     string `json:"name"`
	Location string `json:"location"`
	Age      int64  `json:"age"`
}
