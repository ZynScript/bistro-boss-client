import React from "react";

const SectionTitle = ({heading, subHeading}) => {
  return (
    <div className="md:w-4/12 mx-auto text-center my-16">
      <p className="text-yellow-600 mb-2 font-mono">--- {subHeading} ---</p>
      <h3 className="text-4xl border-y-2 py-3 uppercase">{heading}</h3>
    </div>
  );
};

export default SectionTitle;
