/// GET ALL RESULTS 
getPage = function() {
    console.log('getting page')
    return Array.from(document.querySelectorAll('button')).filter((btn) => btn.textContent === 'さらに表示').pop();
}

function getPageLooper() {
    if (getPage()) {
        getPage().click();
        setTimeout(getPageLooper, 1000);
    }
}

// get all buttons

buttons = Array.from(document.querySelectorAll('a')).filter(el => {
    return el.innerText === '領収書を表示する';
});

// open dialogs
x = async function(buttons, i) {
    let button = buttons[i];
    if (!button) return;
    console.log(new Date(), 'clicking button', {button});
    button.click();
    console.log(new Date(), 'waiting 3 seconds');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(new Date(), 'clicking download');
    Array.from(document.querySelectorAll('a')).filter(el => el.innerText === 'PDF をダウンロード').pop().click();
    console.log(new Date(), 'waiting 5 seconds');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    document.querySelector('button[aria-label="閉じる”]’).click()
    console.log(new Date(), 'moving onto next...');
    if (buttons[i + 1]) {
      x(buttons, i + 1);
    }
}
