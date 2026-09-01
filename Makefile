# design-skill -- install the payload as REAL COPIES (never symlinks) into
# every local agent skill root, clean up what the old version left, check
# the toolchain, run the proof.
#
#   make install            copy skills/design-skill -> ~/.claude/skills and ~/.agents/skills
#                           (itemizes added / updated / removed files; reports old -> new version;
#                            sweeps for older installs of THIS skill under old names)
#   make install PURGE=1    also remove old-name installs the sweep found
#   make install DEST=~/x   one extra root
#   make sweep              the cleanup report only, no install
#   make deps               node / rsync / curl / uv present?
#   make validate           scripts/validate.sh (the proof)
#   make check DIR=path     kit/check.sh on a project dir
#   make uninstall          remove the installed copies
#   make fonts F="Noto Sans SC" W=400,700 OUT=public/fonts

SHELL    := /usr/bin/env bash
SKILL    := design-skill
SRC      := skills/$(SKILL)
ROOTS    := $(HOME)/.claude/skills $(HOME)/.agents/skills $(DEST)
DIR      ?= src
PURGE    ?= 0
# names an older install of this skill may sit under
OLDNAMES := lroolle-design-skill design-skill-old design-skill.bak design-skill.old
VERSION  := $(shell awk '/^  version:/{gsub(/"/,"",$$2); print $$2; exit}' $(SRC)/SKILL.md)

.PHONY: install uninstall deps validate check fonts list sweep

install: deps
	@echo "== install $(SKILL) v$(VERSION) from $(SRC)"
	@for r in $(ROOTS); do \
	  [ -n "$$r" ] || continue; \
	  t="$$r/$(SKILL)"; \
	  if [ -L "$$t" ]; then echo "REFUSE $$t is a symlink (policy: real copies only). rm it and re-run."; exit 1; fi; \
	  old=$$( [ -f "$$t/SKILL.md" ] && awk '/^  version:/{gsub(/"/,"",$$2); print $$2; exit}' "$$t/SKILL.md" || echo none ); \
	  mkdir -p "$$t"; \
	  log=$$(rsync -ai --delete --exclude '.git' --exclude 'node_modules' "$(SRC)/" "$$t/"); \
	  add=$$(grep -c '^>f+++' <<< "$$log"); upd=$$(grep -cE '^>f[^+]' <<< "$$log"); del=$$(grep -c '^\*deleting' <<< "$$log"); \
	  chmod +x "$$t"/kit/*.sh "$$t"/scripts/*.mjs; \
	  n=$$(find "$$t" -type f | wc -l | tr -d ' '); \
	  echo "-- $$t"; \
	  echo "   version $$old -> $(VERSION)   files $$n   added $$add   updated $$upd   removed $$del"; \
	  if [ "$$del" -gt 0 ]; then grep '^\*deleting' <<< "$$log" | sed 's/^\*deleting *//' | sed 's/^/   removed  /' | head -40; \
	    [ "$$del" -gt 40 ] && echo "   ... $$((del-40)) more"; fi; \
	  [ "$$add" -gt 0 ] && grep '^>f+++' <<< "$$log" | awk '{print "   added    " $$2}' | head -20; \
	  [ "$$add" -gt 20 ] && echo "   ... $$((add-20)) more"; \
	  true; \
	done
	@$(MAKE) --no-print-directory sweep
	@echo "== installed"
	@$(MAKE) --no-print-directory list

# older installs of this skill under other names; nothing else is touched
sweep:
	@echo "== sweep"; found=0; \
	for r in $(ROOTS); do [ -n "$$r" ] && [ -d "$$r" ] || continue; \
	  for o in $(OLDNAMES); do \
	    if [ -e "$$r/$$o" ]; then found=1; \
	      if [ "$(PURGE)" = 1 ]; then rm -rf "$$r/$$o" && echo "   purged   $$r/$$o (old-name install)"; \
	      else echo "   STALE    $$r/$$o -- an older install under its previous name; make install PURGE=1 removes it"; fi; fi; \
	  done; \
	  for d in "$$r"/*/; do d=$${d%/}; b=$$(basename "$$d"); \
	    [ "$$b" = "$(SKILL)" ] && continue; \
	    [ -f "$$d/SKILL.md" ] && grep -q 'homepage: https://github.com/lroolle/design-skill' "$$d/SKILL.md" 2>/dev/null \
	      && { found=1; echo "   STALE    $$d -- carries this skill's homepage under another name; make install PURGE=1 does NOT touch it, remove by hand"; }; \
	  done; \
	done; \
	[ "$$found" = 0 ] && echo "   clean: no older installs of $(SKILL) under other names"; true

uninstall:
	@for r in $(ROOTS); do [ -n "$$r" ] && [ -d "$$r/$(SKILL)" ] && rm -rf "$$r/$(SKILL)" && echo "removed $$r/$(SKILL)"; done; true

deps:
	@echo "== deps"; ok=1; \
	command -v node >/dev/null && echo "   ok    node $$(node --version)  (roll.mjs, validate)" || { echo "   MISS  node -- roll.mjs and validate.sh need it"; ok=0; }; \
	command -v rsync >/dev/null && echo "   ok    rsync" || { echo "   MISS  rsync -- make install needs it"; ok=0; }; \
	command -v curl >/dev/null && echo "   ok    curl  (kit/fonts.sh)" || echo "   warn  curl missing -- kit/fonts.sh cannot fetch faces"; \
	command -v uvx >/dev/null && echo "   ok    uvx   (kit/fonts.sh --slice via fonttools)" || echo "   warn  uv missing -- kit/fonts.sh --slice unavailable (https://docs.astral.sh/uv/)"; \
	[ "$$ok" = 1 ]

validate:
	@bash scripts/validate.sh

check:
	@bash $(SRC)/kit/check.sh $(DIR)

fonts:
	@bash $(SRC)/kit/fonts.sh "$(F)" $(W) $(OUT)

list:
	@for r in $(ROOTS); do [ -n "$$r" ] && [ -e "$$r/$(SKILL)" ] && printf '   %-45s v%s  %s files\n' "$$r/$(SKILL)" "$$(awk '/^  version:/{gsub(/"/,"",$$2); print $$2; exit}' "$$r/$(SKILL)/SKILL.md")" "$$(find "$$r/$(SKILL)" -type f | wc -l | tr -d ' ')"; done; true
