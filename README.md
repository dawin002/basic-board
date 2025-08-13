📦basic-board
┣ 📂.github
┃ ┗ 📂workflows
┃ ┃ ┗ 📜deploy.yml
┣ 📂.vscode
┃ ┗ 📜settings.json
┣ 📂backend
┃ ┣ 📂src
┃ ┃ ┣ 📂apis
┃ ┃ ┃ ┣ 📂boards
┃ ┃ ┃ ┃ ┣ 📂dto
┃ ┃ ┃ ┃ ┃ ┣ 📜create-board.input.ts
┃ ┃ ┃ ┃ ┃ ┣ 📜create-board.output.ts
┃ ┃ ┃ ┃ ┃ ┣ 📜delete-board.input.ts
┃ ┃ ┃ ┃ ┃ ┣ 📜delete-board.output.ts
┃ ┃ ┃ ┃ ┃ ┣ 📜get-board-by-number.input.ts
┃ ┃ ┃ ┃ ┃ ┣ 📜get-board-by-number.output.ts
┃ ┃ ┃ ┃ ┃ ┣ 📜get-boards.output.ts
┃ ┃ ┃ ┃ ┃ ┣ 📜update-board.input.ts
┃ ┃ ┃ ┃ ┃ ┗ 📜update-board.output.ts
┃ ┃ ┃ ┃ ┣ 📂models
┃ ┃ ┃ ┃ ┃ ┣ 📜board.model.ts
┃ ┃ ┃ ┃ ┃ ┗ 📜counter.model.ts
┃ ┃ ┃ ┃ ┣ 📂validators
┃ ┃ ┃ ┃ ┃ ┣ 📜create-board.validator.ts
┃ ┃ ┃ ┃ ┃ ┗ 📜update-board.validator.ts
┃ ┃ ┃ ┃ ┣ 📜boards.controller.ts
┃ ┃ ┃ ┃ ┣ 📜boards.routes.ts
┃ ┃ ┃ ┃ ┗ 📜boards.service.ts
┃ ┃ ┃ ┗ 📂common
┃ ┃ ┃ ┃ ┗ 📂errors
┃ ┃ ┃ ┃ ┃ ┗ 📜customError.ts
┃ ┃ ┣ 📂config
┃ ┃ ┃ ┗ 📜db.ts
┃ ┃ ┣ 📜app.ts
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂swagger
┃ ┃ ┣ 📜config.ts
┃ ┃ ┣ 📜create-board.swagger.ts
┃ ┃ ┣ 📜delete-board.swagger.ts
┃ ┃ ┣ 📜get-board-by-number.swagger.ts
┃ ┃ ┣ 📜get-boards.swagger.ts
┃ ┃ ┗ 📜update-board.swagger.ts
┃ ┣ 📜.dockerignore
┃ ┣ 📜.env
┃ ┣ 📜.env.docker
┃ ┣ 📜.eslintrc.ts
┃ ┣ 📜.prettierrc
┃ ┣ 📜Dockerfile
┃ ┣ 📜package-lock.json
┃ ┣ 📜package.json
┃ ┣ 📜tsconfig.json
┃ ┗ 📜yarn.lock
┣ 📂frontend
┃ ┣ 📂css
┃ ┃ ┣ 📜board-detail.css
┃ ┃ ┗ 📜board-list.css
┃ ┣ 📂js
┃ ┃ ┣ 📂utils
┃ ┃ ┃ ┣ 📜getAxiosErrorMessage.js
┃ ┃ ┃ ┣ 📜handleAxiosErrorSideEffect.js
┃ ┃ ┃ ┗ 📜navigation.js
┃ ┃ ┣ 📜board-create.js
┃ ┃ ┣ 📜board-detail.js
┃ ┃ ┣ 📜board-list.js
┃ ┃ ┗ 📜board-update.js
┃ ┣ 📂nginx
┃ ┃ ┗ 📜default.conf
┃ ┣ 📜.prettierrc
┃ ┣ 📜Dockerfile
┃ ┣ 📜board-create.html
┃ ┣ 📜board-detail.html
┃ ┣ 📜board-list.html
┃ ┗ 📜board-update.html
┣ 📜.DS_Store
┣ 📜.dockerignore
┣ 📜.env
┣ 📜.eslintrc.ts
┣ 📜.gitignore
┣ 📜.prettierrc
┣ 📜README.md
┣ 📜docker-compose.yaml
┗ 📜project_plan.md
