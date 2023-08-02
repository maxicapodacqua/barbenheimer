ENABLE_WASM_OPT ?= false

.PHONY: build
build:
	cargo build --target wasm32-wasi --release && cp ./target/wasm32-wasi/release/counter.wasm ../wasm/counter.wasm
ifeq ($(ENABLE_WASM_OPT),true)
	wasm-opt target/wasm32-wasi/release/counter.wasm -o ../components/counter.wasm -Os
endif

.PHONY: serve
serve: build
serve:
	spin up -f ../spin.toml