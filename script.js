// 初期化処理
let WS_MODO = '';
let WS_NUM_1 = 0;
let WS_NUM_2 = 0;
let WS_RESULT = 0;

const mainProcedure = () => {
    initializeVariables();
    processCalculation();
}

// 変数の初期化
const initializeVariables = () => {
    WS_MODO = '';
    WS_NUM_1 = 0;
    WS_NUM_2 = 0;
    WS_RESULT = 0;
}

// モーダル表示用関数
const showModal = (message, callback, hideInput = false) => {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalInput = document.getElementById('modal-input');

    modalMessage.textContent = message;
    modal.style.display = 'flex';

    if (hideInput) {
        modalInput.style.display = 'none';
        setTimeout(() => {
            modal.style.display = 'none';
            callback();
        }, 1000);
    } else {
        modalInput.style.display = 'block';
        modalInput.onkeydown =  event => {
            if (event.key === 'Enter') {
                const value = modalInput.value;
                // playSound('clickSound');  // エンターキー押下時にクリック音を再生
                modalInput.value = '';
                modal.style.display = 'none';
                callback(value);
            }
        };
        modalInput.focus();
    }
}

// 計算処理の再帰関数
const processCalculation = () => {
    selectCalculationMode();
}

// 計算モードの選択
const selectCalculationMode = () => {
    showModal("Chọn chế độ tính toán: 1) Phép cộng 2) Phép trừ 3) Phép chia 4) Phép nhân",  mode  => {
        WS_MODO = mode;
        executeCalculationMode();
    });
}

// 計算モードに応じた処理の実行
const  executeCalculationMode = () => {
    switch (WS_MODO) {
        case '1':
            PROC_SOMAR();
            break;
        case '2':
            PROC_SUBTRAIR();
            break;
        case '3':
            PROC_DIVIDIR();
            break;
        case '4':
            PROC_MULTIPLICAR();
            break;
        default:
            showModal("Đã chọn chế độ không hợp lệ", processCalculation, true);
            break;
    }
}

// 結果表示
const displayResult = ()  => {
    showModal("Kết quả tính toán: " + WS_RESULT, () => {
        continueProgram().then((cont) => {
            if (cont) {
                processCalculation();
            } else {
                endProcedure();
            }
        });
    }, true);
}

// 続行有無の確認
const continueProgram = () => {
    return new Promise((resolve) => {
        showModal("Bạn có muốn tiếp tục? (S để tiếp tục, phím bất kỳ để thoát)", continueInput => {
            if (continueInput.toUpperCase() === 'S') {
                resolve(true);
            } else {
                showModal("Thoát khỏi chương trình.", () => resolve(false), true);
            }
        });
    });
}

// 終了処理
const endProcedure = () => {
    showModal("Thoát khỏi chương trình.", () => {}, true);
}

// 加算処理
const PROC_SOMAR = () => {
    showModal("Vui lòng nhập số đầu tiên:", num1 => {
        WS_NUM_1 = parseFloat(num1);
        showModal("Vui lòng nhập số thứ hai:", num2 => {
            WS_NUM_2 = parseFloat(num2);
            WS_RESULT = WS_NUM_1 + WS_NUM_2;
            displayResult();
        });
    });
}

// 減算処理
const PROC_SUBTRAIR = () => {
    showModal("Vui lòng nhập số đầu tiên:", num1 => {
        WS_NUM_1 = parseFloat(num1);
        showModal("Vui lòng nhập số thứ hai:", num2 => {
            WS_NUM_2 = parseFloat(num2);
            WS_RESULT = WS_NUM_1 - WS_NUM_2;
            displayResult();
        });
    });
}

// 除算処理
const PROC_DIVIDIR = () => {
    showModal("Vui lòng nhập số đầu tiên:", num1 => {
        WS_NUM_1 = parseFloat(num1);
        showModal("Vui lòng nhập số thứ hai:", num2 => {
            WS_NUM_2 = parseFloat(num2);
            WS_RESULT = WS_NUM_1 / WS_NUM_2;
            displayResult();
        });
    });
}

// 乗算処理
const PROC_MULTIPLICAR = () => {
    showModal("Vui lòng nhập số đầu tiên:", num1 => {
        WS_NUM_1 = parseFloat(num1);
        showModal("Vui lòng nhập số thứ hai:", num2 => {
            WS_NUM_2 = parseFloat(num2);
            WS_RESULT = WS_NUM_1 * WS_NUM_2;
            displayResult();
        });
    });
}

// const playSound = ()  =>{
//     const sound = document.getElementById('clickSound');
//     sound.volume = 0.3; 
//     sound.currentTime = 0;
//     sound.play();
// }

const toggleMusic = () => {
    const bgm = document.getElementById('bgm');
    if (bgm.paused) {
        bgm.play();
    } else {
        bgm.pause();
    }
}
