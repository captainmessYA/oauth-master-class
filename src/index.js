// Авторизуем пользователя, используя инфу о нем.
const authorize = ({
  default_avatar_id: defaultAvatarId,
  display_name: displayName,
}) => {
  const avatarHtml = `<div class="avatar" style="background-image:url('https://avatars.mds.yandex.net/get-yapic/${defaultAvatarId}/islands-middle')"></div>`;
  const nameHtml = `<div class="name">${displayName}</div>`;

  document.getElementById("auth").innerHTML = `${avatarHtml}${nameHtml}`;
};

// Делаем запрос за инфой о пользователе.
const fetchYandexData = (token) =>
  fetch(`https://login.yandex.ru/info?format=json&oauth_token=${token}`).then(
    (res) => res.json()
  );

window.onload = () => {
  document.getElementById("suggest").onclick = () => {
    YaAuthSuggest.init({
         client_id: '9873d42f585b4d5b9eceb418013d9fc4', 
         response_type: 'token',
         redirect_uri: 'https://oauth-master-class-alpha.vercel.app/token.html'
      },
      'https://oauth-master-class-alpha.vercel.app/'
   )
   .then(({ handler }) => handler())
      .then(async (data) => {
        const result = await fetchYandexData(data.access_token);

        authorize(result);

        console.log(result, data);
      })
      .catch((error) => console.log("Что-то пошло не так: ", error));
  };
  document.getElementById("button").onclick = () => {
    YaAuthSuggest.init({
         client_id: '9873d42f585b4d5b9eceb418013d9fc4', 
         response_type: 'token',
         redirect_uri: 'https://oauth-master-class-alpha.vercel.app/token.html'
      },
      'https://oauth-master-class-alpha.vercel.app/'      
      {
        parentId: "buttonContainer",
        view: "button",
        buttonTheme: "light",
        buttonSize: "xs",
        buttonBorderRadius: 20,
      }
    )
      .then(({ handler }) => handler())
      .then(async (data) => {
        const result = await fetchYandexData(data.access_token);

        authorize(result);

        console.log(result, data);
      })
      .catch((error) => console.log("Что-то пошло не так: ", error));
  };
};
