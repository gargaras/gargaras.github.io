(function () {

    function autoSubmitOTP() {
        if ('OTPCredential' in window) {
            window.addEventListener('DOMContentLoaded', e => {
                const input = document.querySelector('#input-otp[autocomplete="one-time-code"]');
                if (!input) {
                    return;
                }

                const ac = new AbortController();
                const form = document.querySelector('#otp-form');
                if (form) {
                    form.addEventListener('submit', e => {
                        ac.abort();
                    });
                }
                navigator.credentials.get({
                    otp: { transport: ['sms'] },
                    signal: ac.signal
                }).then(otp => {
                    input.value = otp.code;
                    if (form) {
                        //form.submit();
                    }
                }).catch(err => {
                    alert('Error while receiving OTP');
                    console.error(err);
                });
            });
        }
        else {
            alert('OTPCredential not supported');
        }
    }

    autoSubmitOTP();
})();