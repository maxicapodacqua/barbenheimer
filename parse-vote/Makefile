ENABLE_WASM_OPT ?= false

.PHONY: build
build:
	cargo build --target wasm32-wasi --release
ifeq ($(ENABLE_WASM_OPT),true)
	wasm-opt target/wasm32-wasi/release/parse-vote.wasm -o ../components/parse-vote.wasm -Os
endif

.PHONY: serve
serve: build
serve:
	spin up -f ../spin.toml