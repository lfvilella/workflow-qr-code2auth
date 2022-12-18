import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const USER_TYPE = 'user';
const SERVER_TYPE = 'server';
const USER_STATIC_QR_CODE_TYPE = `${USER_TYPE}-static-qr-code`;
const USER_DYNAMIC_QR_CODE_TYPE = `${USER_TYPE}-dynamic-qr-code`;
const SERVER_CAMERA_ACCESS_TYPE = `${SERVER_TYPE}-camera-access`;
const SERVER_UPLOAD_QR_CODE_TYPE = `${SERVER_TYPE}-upload-qr-code`;

createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            isHomePage: true,
            isDiagnosticPage: false,
            forkType: undefined,
            state: 0,
            questionsForState: [
                {
                    id: "question-1",
                    state: 0,
                    question: "O público alvo do seu problema tem disponibilidade de smartphone ou algum dispositivo leitor de QR Code?",
                    helper: "One-time password (OTP) são códigos aleatórios, normalmente válido por um período de tempo predefinido e razoável que nunca será usado ou gerado novamente.",
                    answers: [
                        {
                            id: "question-1-a1",
                            value: "Sim",
                            diagnostic: null,
                        },
                        {
                            id: "question-1-a2",
                            value: "Não",
                            diagnostic: "É necessário ter algum dispositivo leitor de QR Code",
                            isEndOfDiagnostic: true,
                        },
                    ],
                },
                {
                    id: "question-2",
                    state: 0,
                    question: "Seu público alvo terá conexão com a internet?",
                    answers: [
                        {
                            id: "question-2-a1",
                            value: "Sim",
                            diagnostic: null,
                        },
                        {
                            id: "question-2-a2",
                            value: "Não",
                            diagnostic: "É necessário ter conexão com a internet",
                            isEndOfDiagnostic: true,
                        },
                    ],
                },
                {
                    id: "question-3",
                    state: 1,
                    question: "O usuário ou o servidor vai ler o QR Code?",
                    answers: [
                        {
                            id: "question-3-a1",
                            value: "Usuário",
                            diagnostic: null,
                        },
                        {
                            id: "question-3-a2",
                            value: "Servidor",
                            diagnostic: null,
                        },
                    ],
                },
                {
                    id: "question-4-user",
                    state: 2,
                    forkType: USER_TYPE,
                    question: "O QR Code vai estar acoplado e um objeto do mundo físico (estático) ou será gerado por um servidor (dinâmico)?",
                    answers: [
                        {
                            id: "question-4-user-a1",
                            value: "Estático",
                            diagnostic: null,
                        },
                        {
                            id: "question-4-user-a2",
                            value: "Dinâmico",
                            diagnostic: null,
                        },
                    ],
                },
                {
                    id: "question-4-server",
                    state: 2,
                    forkType: SERVER_TYPE,
                    question: "O terminal que interage com o servidor tem acesso á câmera (web browser) ou será feito upload do QR Code para o servidor?",
                    answers: [
                        {
                            id: "question-4-server-a1",
                            value: "Acesso à câmera",
                            diagnostic: null,
                        },
                        {
                            id: "question-4-server-a2",
                            value: "Upload",
                            diagnostic: "Caso de autenticação via QR Code não definido. E também não é muito indicado, por questões de usabilidade",
                            isEndOfDiagnostic: true,
                        },
                    ],
                    suggestion: "A origem do QR Code deve ser conhecida, possivelmente gerado pelo próprio sistema em outra etapa da autenticação."
                },
                {
                    id: "question-5-user-static-qr-code",
                    state: 3,
                    forkType: USER_STATIC_QR_CODE_TYPE,
                    question: "Deseja fazer um cruzamento dos dados para confirmar a entidade? Exemplo check-in.",
                    answers: [
                        {
                            id: "question-5-user-static-qr-code-a1",
                            value: "Sim",
                            diagnostic: "Ao realizar o cruzamento dos dados para confirmar a entidade, certifique-se que ambas as partes do processo estejam se comunicando no mesmo protocolo",
                        },
                        {
                            id: "question-5-user-static-qr-code-a2",
                            value: "Não",
                            diagnostic: "Caso de autenticação via QR Code não definido. Cenário se assemelha a utilização da tecnologia para outros propósitos como na publicidade ou marketing",
                            isEndOfDiagnostic: true,
                        },
                    ],
                    suggestion: "Em casos de QR Code estático e importante ter cuidados para mitigar possíveis fraudes do código exposto"
                },
                {
                    id: "question-5-user-dynamic-qr-code",
                    state: 3,
                    forkType: USER_DYNAMIC_QR_CODE_TYPE,
                    question: "Sua composição de autenticação já tem o primeiro fator de autenticação? Exemplo email/password",
                    answers: [
                        {
                            id: "question-5-user-dynamic-qr-code-a1",
                            value: "Sim",
                            diagnostic: null,
                        },
                        {
                            id: "question-5-user-dynamic-qr-code-a2",
                            value: "Não",
                            diagnostic: null,
                            suggestion: "É indicado adicionar um primeiro fator de autenticação, como user/password",
                        },
                    ],
                },
                {
                    id: "question-5-server",
                    state: 3,
                    forkType: SERVER_CAMERA_ACCESS_TYPE,
                    question: "O QR Code que será lido está sincronizado com o servidor? Ou seja, ambos seguem o mesmo protocolo de comunicação?",
                    answers: [
                        {
                            id: "question-5-server-a1",
                            value: "Sim",
                            diagnostic: null,
                        },
                        {
                            id: "question-5-server-a2",
                            value: "Não",
                            diagnostic: "É necessário que o servidor e o QR Code estejam sincronizados",
                            isEndOfDiagnostic: true,
                        },
                    ],
                    suggestion: "A lógica de processamento pelo servidor deve ser bem concisa e tolerante a falhas"
                },
                {
                    id: "question-6-user",
                    state: 4,
                    forkType: USER_TYPE,
                    question: "Deseja adicionar o fator OTP na composição MFA?",
                    helper: "One-time password (OTP) são códigos aleatórios, normalmente válido por um período de tempo predefinido e razoável que nunca será usado ou gerado novamente.",
                    answers: [
                        {
                            id: "question-6-user-a1",
                            value: "Sim",
                            diagnostic: "Ao adicionar OTP em sua solução MFA, revise os pontos de segurança desta tecnologia para evitar fraudes. Exemplo: https://ieeexplore.ieee.org/document/7164835",  // TODO: Tentar injetar componente html <a> evitar fraudes</a href="https://ieeexplore.ieee.org/document/7164835">
                        },
                        {
                            id: "question-6-user-a2",
                            value: "Não",
                            diagnostic: null,
                        },
                    ],
                },
                {
                    id: "question-6-server",
                    state: 4,
                    forkType: SERVER_TYPE,
                    question: "Sua composição de autenticação já tem o primeiro fator de autenticação?",
                    answers: [
                        {
                            id: "question-6-server-a1",
                            value: "Sim",
                            diagnostic: null,
                        },
                        {
                            id: "question-6-server-a2",
                            value: "Não",
                            diagnostic: null,
                            suggestion: "É indicado adicionar um primeiro fator de autenticação, como user/password",
                        },
                    ],
                },
                {
                    id: "question-7-user",
                    state: 5,
                    forkType: USER_TYPE,
                    question: "Deseja adicionar o fator biométrico na composição MFA?",
                    answers: [
                        {
                            id: "question-7-user-a1",
                            value: "Sim",
                            diagnostic: "Ao adicionar biometria em sua solução MFA, revise os pontos de segurança desta tecnologia para evitar fraudes. Exemplo: https://ieeexplore.ieee.org/document/7164835",
                        },
                        {
                            id: "question-7-user-a2",
                            value: "Não",
                            diagnostic: null,
                        },
                    ],
                },
                {
                    id: "question-7-server",
                    state: 5,
                    forkType: SERVER_TYPE,
                    question: "Deseja adicionar o fator OTP na composição MFA?",
                    helper: "One-time password (OTP) são códigos aleatórios, normalmente válido por um período de tempo predefinido e razoável que nunca será usado ou gerado novamente.",
                    answers: [
                        {
                            id: "question-7-server-a1",
                            value: "Sim",
                            diagnostic: "Ao adicionar OTP em sua solução MFA, revise os pontos de segurança desta tecnologia para evitar fraudes. Exemplo: https://ieeexplore.ieee.org/document/7164835",  // TODO: Tentar injetar componente html <a> evitar fraudes</a href="https://ieeexplore.ieee.org/document/7164835">
                        },
                        {
                            id: "question-7-server-a2",
                            value: "Não",
                            diagnostic: null,
                        },
                    ],
                },
                {
                    id: "question-7.1-server",
                    state: 5,
                    forkType: SERVER_TYPE,
                    question: "Caso sim, deseja substituir o numeral do OTP por one-time QR Codes?",
                    answers: [
                        {
                            id: "question-7-server-a1",
                            value: "Sim",
                            diagnostic: "Para usar one-times Qr codes será necessário codificar cada numeral do OTP gerado para um código QR",
                        },
                        {
                            id: "question-7-server-a2",
                            value: "Não",
                            diagnostic: null,
                        },
                    ],
                },
                {
                    id: "question-8",
                    state: 6,
                    forkType: undefined,
                    question: "Você deseja adicionar tempo de expiração no QR Code?",
                    answers: [
                        {
                            id: "question-8-a1",
                            value: "Sim",
                            diagnostic: "Ao adicionar tempo de expiração no QR Code é necessário validar no lado da execução da lógica do sistema se código está expirado",
                        },
                        {
                            id: "question-8-a2",
                            value: "Não",
                            diagnostic: null,
                        },
                    ],
                },
                {
                    id: "question-9",
                    state: 6,
                    forkType: undefined,
                    question: "Você deseja coleta informações de GPS?",
                    answers: [
                        {
                            id: "question-9-a1",
                            value: "Sim",
                            diagnostic: "Para coletar informações de GPS é necessário que o app de leitura de QR Code colete esta informação e envie junto para a entidade alvo",
                        },
                        {
                            id: "question-9-a2",
                            value: "Não",
                            diagnostic: null,
                        },
                    ],
                },
                {
                    id: "question-10",
                    state: 6,
                    forkType: undefined,
                    question: "Você tem informações sensíveis para serem armazenadas no QR Code?",
                    answers: [
                        {
                            id: "question-10-a1",
                            value: "Sim",
                            diagnostic: "Para dados sensíveis a serem armazenados é interessante utilizar o QR Code criptografado que vem equipado com função de restrição de leitura",
                        },
                        {
                            id: "question-10-a2",
                            value: "Não",
                            diagnostic: null,
                        },
                    ],
                },
                {
                    id: "question-11",
                    state: 6,
                    forkType: undefined,
                    question: "Deseja adicionar camada de dados públicos e privados no QR Code?",
                    answers: [
                        {
                            id: "question-11-a1",
                            value: "Sim",
                            diagnostic: "Para adicionar camada de dados públicos e privados é proposto estudar sobre 2LQR (https://ieeexplore.ieee.org/document/7349185)",
                        },
                        {
                            id: "question-11-a2",
                            value: "Não",
                            diagnostic: null,
                        },
                    ],
                },
                {
                    id: "question-12",
                    state: 6,
                    forkType: undefined,
                    question: "O lugar que será exibido o QR Code possui limitações de espaço?",
                    helper: "Está pergunta está relacionada as variações do QR Code e suas particularidades.",
                    answers: [
                        {
                            id: "question-12-a1",
                            value: "Sim",
                            diagnostic: "Dado um espaço mais limitado para expor o QR Code é preferível utilizar sua versão micro QR Code ou IqrCode",
                        },
                        {
                            id: "question-12-a2",
                            value: "Não",
                            diagnostic: null,
                        },
                    ],
                },
                {
                    id: "question-13",
                    state: 6,
                    forkType: undefined,
                    question: "Deseja armazenar mais de 2000 bytes de informação?",
                    helper: "Está pergunta está relacionada a versão do QR Code, onde quanto maior for a versão suportará maior quantidade de dados dentro do código.",
                    answers: [
                        {
                            id: "question-13-a1",
                            value: "Sim",
                            diagnostic: "Consulte a tabela de versões do QR Code para saber mais a respeito: https://www.qrcode.com/en/about/version.html",
                        },
                        {
                            id: "question-13-a2",
                            value: "Não",
                            diagnostic: "Consulte a tabela de versões do QR Code para saber mais a respeito: https://www.qrcode.com/en/about/version.html",
                        },
                    ],
                },
                {
                    id: "question-14",
                    state: 6,
                    forkType: undefined,
                    question: "O ambiente que QR Code ficará será sujo como em fábricas, podendo ter um desgaste do código ao longo do tempo?",
                    helper: "Está pergunta está relacionada a correção de erros. A correção de erros permite que o símbolo seja lido mesmo se estiver sujo ou danificado.\n Quanto maior o nível de correção de erros, menor a capacidade de armazenamento",
                    answers: [
                        {
                            id: "question-14-a1",
                            value: "Sim",
                            diagnostic: "Para ambientes mais sujos como nas fábricas é interessante utilizar o nível Q ou H na correção de erro (https://www.qrcode.com/en/about/error_correction.html)",
                        },
                        {
                            id: "question-14-a2",
                            value: "Não",
                            diagnostic: "Para ambientes mais limpos é interessante utilizar o nível M ou L na correção de erro (https://www.qrcode.com/en/about/error_correction.html)",
                        },
                    ],
                },
            ],
            lastState: 6,
            shouldYouUseQRCode: undefined,
            diagnostic: [],
            suggestions: [],
        }
    },
    methods: {
        startDiagnostic() {
            this.isHomePage = false;
        },
        _getQuestionsByStateAndForkType(state, forkType=undefined) {
            const questions = [];
            for (let i = 0; i < this.questionsForState.length; i++) {
                const item = this.questionsForState[i];
                if (item.state == state && item.forkType == forkType) {
                    questions.push(item)
                }
            }
            return questions;
        },
        _getQuestionsFromCurrentState() {
            return this._getQuestionsByStateAndForkType(this.state);
        },
        _setEndOfDiagnostic() {
            this.forkType = undefined;
            this.isDiagnosticPage = true;
            this.state = 0;
        },
        _handleQuestionsForState0() {
            const questions = this._getQuestionsByStateAndForkType(0);
            let finishDiagnostic = false;
            for (let i = 0; i < questions.length; i++) {
                const item = questions[i];

                for (let j = 0; j < item.answers.length; j++) {
                    const answer = item.answers[j];
                    if (document.getElementById(answer.id).checked && answer.diagnostic) {
                        this.diagnostic.push(answer.diagnostic);
                        finishDiagnostic = answer.isEndOfDiagnostic;
                    }
                }
            }
            if (finishDiagnostic === true) {
                this.shouldYouUseQRCode = false;
                this._setEndOfDiagnostic();
            }
        },
        _handleQuestionsForState1() {
            const questions = this._getQuestionsByStateAndForkType(1);
            const userGonnaReadQRCodeAnswer = questions[0].answers[0];
            const followUserFlow = document.getElementById(userGonnaReadQRCodeAnswer.id).checked;
            this.forkType = followUserFlow ? USER_TYPE : SERVER_TYPE;
        },
        _handleQuestionsForState2() {
            const questions = this._getQuestionsByStateAndForkType(2, this.forkType);
            const question = questions[0];
            if (this.forkType == USER_TYPE) {
                const isDynamicQRCodeAnswer = question.answers[1];
                const isDynamicQRCode = document.getElementById(isDynamicQRCodeAnswer.id).checked;
                this.forkType = isDynamicQRCode ? USER_DYNAMIC_QR_CODE_TYPE : USER_STATIC_QR_CODE_TYPE;
            }
            else if (this.forkType == SERVER_TYPE) {
                const hasCameraAccessAnswer = question.answers[0];
                const hasCameraAccess = document.getElementById(hasCameraAccessAnswer.id).checked;
                this.forkType = hasCameraAccess ? SERVER_CAMERA_ACCESS_TYPE : SERVER_UPLOAD_QR_CODE_TYPE;
                if (!hasCameraAccess) {
                    const isUploadAnswer = question.answers[1];
                    this.diagnostic.push(isUploadAnswer.diagnostic);
                    if (isUploadAnswer.isEndOfDiagnostic) {
                        this.shouldYouUseQRCode = false;
                        this._setEndOfDiagnostic();
                    }
                }
            }
        },
        _handleQuestionsForState3() {
            const questions = this._getQuestionsByStateAndForkType(3, this.forkType);
            const question = questions[0];
            switch (this.forkType) {
                case USER_STATIC_QR_CODE_TYPE:
                    const doesNotWantToCrossDataToConfirmEntityAnswer = question.answers[1];
                    const doesNotWantToCrossDataToConfirmEntity = document.getElementById(
                        doesNotWantToCrossDataToConfirmEntityAnswer.id).checked;
                    if (doesNotWantToCrossDataToConfirmEntity) {
                        this.diagnostic.push(doesNotWantToCrossDataToConfirmEntityAnswer.diagnostic);
                        this.shouldYouUseQRCode = false;
                        this._setEndOfDiagnostic();
                    }
                    else {
                        const answer = question.answers[0];
                        this.diagnostic.push(answer.diagnostic);
                        this.suggestions.push(question.suggestion);
                    }
                    this.forkType = USER_TYPE;  // Go back to user branch
                    break;
                case USER_DYNAMIC_QR_CODE_TYPE:
                    const userHasNot1FAAnswer = question.answers[1];
                    const userHasNot1FA = document.getElementById(userHasNot1FAAnswer.id).checked;
                    if (userHasNot1FA) {
                        this.suggestions.push(userHasNot1FAAnswer.suggestion);
                    }
                    this.forkType = USER_TYPE;  // Go back to user branch
                    break;
                case SERVER_CAMERA_ACCESS_TYPE:
                    const qrCodeIsNotSyncAnswer = question.answers[1];
                    const qrCodeIsNotSync = document.getElementById(qrCodeIsNotSyncAnswer.id).checked;
                    if (qrCodeIsNotSync && qrCodeIsNotSyncAnswer.isEndOfDiagnostic) {
                        this.diagnostic.push(qrCodeIsNotSyncAnswer.diagnostic);
                        this.shouldYouUseQRCode = false;
                        this._setEndOfDiagnostic()
                    }
                    else {
                        this.suggestions.push(question.suggestion);
                    }
                    this.forkType = SERVER_TYPE;  // Go back to server branch
                    break;
                case SERVER_UPLOAD_QR_CODE_TYPE:
                    this._setEndOfDiagnostic();
                    this.forkType = SERVER_TYPE;  // Go back to server branch
                    break
            }
        },
        _handleQuestionsForState4() {
            const questions = this._getQuestionsByStateAndForkType(4, this.forkType);
            const question = questions[0];
            if (this.forkType == USER_TYPE) {
                const userWantToAddOTPAnswer = question.answers[0];
                const userWantToAddOTP = document.getElementById(userWantToAddOTPAnswer.id).checked;
                if (userWantToAddOTP) {
                    this.diagnostic.push(userWantToAddOTPAnswer.diagnostic);
                }
            }
            else if (this.forkType == SERVER_TYPE) {
                const userHasNot1FAAnswer = question.answers[1];
                const userHasNot1FA = document.getElementById(userHasNot1FAAnswer.id).checked;
                if (userHasNot1FA) {
                    this.suggestions.push(userHasNot1FAAnswer.suggestion);
                }
            }
        },
        _handleQuestionsForState5() {
            const questions = this._getQuestionsByStateAndForkType(5, this.forkType);
            const question = questions[0];
            if (this.forkType == USER_TYPE) {
                const userWantToAddBiometricFAAnswer = question.answers[0];
                const userWantToAddBiometricFA = document.getElementById(userWantToAddBiometricFAAnswer.id).checked;
                if (userWantToAddBiometricFA) {
                    this.diagnostic.push(userWantToAddBiometricFAAnswer.diagnostic);
                }
            }
            else if (this.forkType == SERVER_TYPE) {
                const userWantToAddOTPAnswer = question.answers[0];
                const userWantToAddOTP = document.getElementById(userWantToAddOTPAnswer.id).checked;
                if (userWantToAddOTP) {
                    this.diagnostic.push(userWantToAddOTPAnswer.diagnostic);
                }

                const secondQuestion = questions[1];
                const userWantToReplaceOTPNumeralToCodesAnswer = secondQuestion.answers[0]
                const userWantToReplaceOTPNumeralToCodes = document.getElementById(
                    userWantToReplaceOTPNumeralToCodesAnswer.id).checked;
                if (userWantToReplaceOTPNumeralToCodes) {
                    this.diagnostic.push(userWantToReplaceOTPNumeralToCodesAnswer.diagnostic);
                }
            }

            this.forkType = undefined;  // Finish branches
        },
        _handleQuestionsForState6() {
            const questions = this._getQuestionsByStateAndForkType(6, this.forkType);
            for (let i = 0; i < questions.length; i++) {
                const item = questions[i];

                for (let j = 0; j < item.answers.length; j++) {
                    const answer = item.answers[j];
                    if (document.getElementById(answer.id).checked && answer.diagnostic) {
                        this.diagnostic.push(answer.diagnostic);
                    }
                }

                if (item.suggestion) {
                    this.diagnostic.push(item.suggestion);
                }
            }
            this.shouldYouUseQRCode = true;
        },
        _handleQuestionFromCurrentState() {
            switch (this.state) {
                case 0:
                    this._handleQuestionsForState0();
                    break;
                case 1:
                    this._handleQuestionsForState1();
                    break;
                case 2:
                    this._handleQuestionsForState2();
                    break;
                case 3:
                    this._handleQuestionsForState3();
                    break;
                case 4:
                    this._handleQuestionsForState4();
                    break;
                case 5:
                    this._handleQuestionsForState5();
                    break;
                case 6:
                    this._handleQuestionsForState6();
                    break;
            }
        },
        goToNextPage() {
            this._handleQuestionFromCurrentState();

            const diagnosticAlreadyFinish = this.isDiagnosticPage;
            if (diagnosticAlreadyFinish) {
                return;
            }

            this.state += 1;
            if (this.state > this.lastState) {
                this._setEndOfDiagnostic();
            }
        },
        openQuestionHelperPopover(divId, btnId) {
            const div = document.getElementById(divId);
            div.style.display = "block";
            const button = document.getElementById(btnId);
            button.style.display = "none";
        },
        closeQuestionHelperPopover(divId, btnId) {
            const div = document.getElementById(divId);
            div.style.display = "none";
            const button = document.getElementById(btnId);
            button.style.display = "block";
        }
    }
}).mount('#app')
