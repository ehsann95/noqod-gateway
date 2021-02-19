(function (global) {
  const npg = function (merchant_id) {
    return new npg.init(merchant_id);
  };

  npg.init = function (merchant_id) {
    let self = this;
    self.merchant_id = merchant_id;
  };

  function sendPaymentRequest(merchant_id, amount, order_id, callback) {
    let gatewayUrl = "https://epic-lumiere-bcf712.netlify.app/";
    let urlParams = `?merchant_id=${merchant_id}&amount=${amount}&order_id=${order_id}&callback=${callback}`;
    injectIframe(gatewayUrl, urlParams);
  }

  function injectIframe(gatewayUrl, urlParams) {
    let iframeContainer = document.getElementById("iframe");
    let iframeUrl = `${gatewayUrl}${urlParams}`;
    iframeContainer.innerHTML = `
                  <div
                    id="iframee"
                    style="
                      background-color: rgba(0, 0, 0, 0.5);
                      height: 100vh;
                      width: 100vw;
                      position: absolute;
                      top: 0;
                      left: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center
                    "
                  >
                    <iframe
                      style="width: 500px; height: 650px; border:none; padding: 0px; overflow-x: hidden;"
                      src=${iframeUrl}
                    />
                  </div>`;
  }

  npg.prototype = {
    sendRequest: function (amount, order_id, callback) {
      sendPaymentRequest(this.merchant_id, amount, order_id, callback);
    },
  };

  npg.init.prototype = npg.prototype;

  global.npg = npg;
})(window);
