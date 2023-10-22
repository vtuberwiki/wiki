export default function CreateSocials(data: any) {
    const socials = data.links;
    const socialsArray = socials.map((social: any) => {
      return {
        url: social,
        name: social.split("/").pop(),
        icon: social.split("https://").pop().split(".")[0],
        iconUppercase: social.split("https://").pop().split(".")[0].charAt(0).toUpperCase() + social.split("https://").pop().split(".")[0].slice(1),
      };
    });

    return socialsArray;
  }