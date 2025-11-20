"use client";

import Script from "next/script";

export default function EquallyWidget() {
  return (
    <Script id="equally-widget" strategy="afterInteractive">
      {`
        document.addEventListener('load', function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "https://widget.prod.equally.ai/equally-widget.min.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'equallyWidget'));

        if (!window.EQUALLY_AI_API_KEY) {
          window.EQUALLY_AI_API_KEY = "6feaa3x4esj5fc2w83fawzkf4d56qq1f";
          const intervalId = setInterval(function() {
            if (window.EquallyAi) {
              clearInterval(intervalId);
              window.EquallyAi = new EquallyAi();
            }
          }, 500);
        }
      `}
    </Script>
  );
}
