FROM rust:1.73 AS builder
WORKDIR /app/verifier
COPY ./verifier .
RUN cargo build --manifest-path=Cargo.toml --release

FROM ubuntu:22.04
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/verifier/target/release/campaign-verifier .
# COPY ./verxioprotocol/public ./public

ENV PORT=8100
ENV NODE=http://node.testnet.concordium.com:20000
ENV LOG_LEVEL=info
EXPOSE ${PORT}

CMD ./campaign-verifier --node ${NODE} --port ${PORT} --log-level ${LOG_LEVEL} --public-folder public