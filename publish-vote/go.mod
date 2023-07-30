module publish-vote

go 1.17

replace github.com/fermyon/spin/sdk/go v0.0.0 => ../../sdk/go/

require (
	github.com/fermyon/spin/sdk/go v1.4.1
	golang.org/x/exp v0.0.0-20230728194245-b0cb94b80691
)

require github.com/julienschmidt/httprouter v1.3.0 // indirect
