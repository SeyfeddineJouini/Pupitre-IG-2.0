import React from "react";

export default function WelcomeBilanComponent(props) {
  const welcomeContent = props.welcomeContent;
  return (
    <div className="flex flex-col grow text-2xl leading-10 max-md:mt-10 max-md:max-w-full">
      <div className="mt-11 text-3xl text-neutral-800 max-md:mt-10 max-md:max-w-full">
        {welcomeContent.title}
      </div>
      <div className="mt-11 text-neutral-600 max-md:mt-10 max-md:max-w-full">
        {welcomeContent.description}
      </div>
    </div>
  );
}