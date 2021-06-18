const toastList = document.querySelectorAll('.toast');

const options = {
    animation: true,
    autohide: false
}
const bootToastList = [];

for (let i = 0; i < toastList.length; i++){
    bootToastList.push(new bootstrap.Toast(toastList[i], options));
}

fire = () => {
    bootToastList[0].show();
}