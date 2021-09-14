SHOW_RECIEPT_TEXT = '領収書を表示する';  // Replace with text of url link for showing the reciept
DOWNLOAD_PDF_BTN_TEXT = 'PDF をダウンロード';  // Replace with PDF download link / button text content
CLOSE_BUTTON_TEXT = "閉じる";  // Replace with close button aria-label (probably "Close" or something like that

/// GET ALL RESULTS 
getPage = function() {
    console.log('getting page')
    return Array.from(document.querySelectorAll('button')).filter((btn) => btn.textContent === 'さらに表示').pop();
}

function showStartButton() {
    const startBtn = document.createElement('button');
    startBtn.textContent = "Start Download";
    startBtn.style = "position: fixed; bottom: 50%; right: 50%; color: white; background: red; border-radius: 50px; box-shadow: 0 0 30px black; padding: 30px;";
    startBtn.onclick = () => {
        x(buttons, 0);
        startBtn.remove();
    }
    document.body.appendChild(startBtn);
}

function getPageLooper() {
    if (getPage()) {
        getPage()?.click();
        setTimeout(getPageLooper, 5000);
    } else {
        showStartButton();
    }
}

getPageLooper();

// get all buttons

buttons = Array.from(document.querySelectorAll('a')).filter(el => {
    return el.innerText === SHOW_RECIEPT_TEXT;
});

// open dialogs
x = async function(buttons, i) {
    console.log(`Attempting to download ${i} of ${buttons.length}`);
    let button = buttons[i];
    if (!button) return;
    console.log(new Date(), 'clicking button', {button});
    button?.click();
    console.log(new Date(), 'waiting 3 seconds');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(new Date(), 'clicking download');
    Array.from(document.querySelectorAll('a')).filter(el => el.innerText === DOWNLOAD_PDF_BTN_TEXT).pop()?.click();
    console.log(new Date(), 'waiting 5 seconds');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    document.querySelector('button[aria-label=' + CLOSE_BUTTON_TEXT + ']')?.click()
    console.log(new Date(), 'moving onto next...');
    if (buttons[i + 1]) {
      x(buttons, i + 1);
    }
}




