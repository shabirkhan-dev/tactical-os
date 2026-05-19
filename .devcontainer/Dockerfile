# Dev container: Bun, Rust, C, Python, Lua, Bash tooling. Matches repo toolchain.
FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

ARG BUN_VERSION=latest
ARG RUST_CHANNEL=stable

# Install apt packages: C toolchain, shellcheck, Python, Lua, git, curl
RUN apt-get update && apt-get install -y --no-install-recommends \
	build-essential \
	clang \
	clang-format \
	clang-tidy \
	curl \
	git \
	ca-certificates \
	shellcheck \
	python3 \
	python3-pip \
	python3-venv \
	lua5.4 \
	luarocks \
	&& rm -rf /var/lib/apt/lists/*

# From here on, run as vscode so tools install in /home/vscode
USER vscode
WORKDIR /home/vscode

# Install Bun (into /home/vscode/.bun)
RUN curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}" \
	&& echo 'export BUN_INSTALL="$HOME/.bun"' >> "${HOME}/.bashrc" \
	&& echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> "${HOME}/.bashrc"
ENV BUN_INSTALL="/home/vscode/.bun" \
	PATH="/home/vscode/.bun/bin:${PATH}"

# Install Rust (stable, rustfmt, clippy)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain "${RUST_CHANNEL}" --profile minimal \
	&& . "${HOME}/.cargo/env" \
	&& rustup component add rustfmt clippy

# Install Python/Lua/Shell tools (optional; scripts:lint/format tolerate missing)
RUN pip install --user ruff 2>/dev/null || true

# shfmt (from GitHub release)
RUN set -e; \
	SHFMT_VER="v3.8.0"; \
	curl -sSL "https://github.com/mvdan/sh/releases/download/${SHFMT_VER}/shfmt_${SHFMT_VER}_linux_amd64" -o /tmp/shfmt; \
	chmod +x /tmp/shfmt; \
	mkdir -p "${HOME}/.local/bin"; \
	mv /tmp/shfmt "${HOME}/.local/bin/shfmt"; \
	echo 'export PATH="${HOME}/.local/bin:${PATH}"' >> "${HOME}/.bashrc"
ENV PATH="/home/vscode/.local/bin:${PATH}"

# stylua + luacheck (Lua); just (optional task runner)
RUN . "${HOME}/.cargo/env" 2>/dev/null; \
	cargo install stylua 2>/dev/null || true; \
	luarocks install luacheck 2>/dev/null || true; \
	cargo install just 2>/dev/null || true

USER root
RUN echo 'export PATH="/home/vscode/.bun/bin:/home/vscode/.cargo/bin:/home/vscode/.local/bin:${PATH}"' >> /etc/profile.d/devcontainer-path.sh
USER vscode
ENV PATH="/home/vscode/.bun/bin:/home/vscode/.cargo/bin:/home/vscode/.local/bin:${PATH}"
