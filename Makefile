.PHONY: all
all:
	@echo "No build step. Available targets:"
	@echo "xpi                     create XPI webex archive"

.PHONY: xpi
xpi:
	@rm -f textern.xpi && cd webex && zip -r -FS ../textern.xpi *
