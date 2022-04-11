import React from "react";
import { useSelector } from "react-redux";
import { selectMember } from "../slice/appSlice";

const Details = () => {
  const member = useSelector(selectMember);

  return (
    <div className="flex flex-col items-center pt-10 detail">
      <h4 className="font-semibold">Member: {member.length}</h4>
      <ul>
        {member.length > 0
          ? member.map((el, index) => (
              <li key={index} className="flex items-center p-5">
                <img
                  src={el.userImage}
                  alt={el.user}
                  className="h-[40px] w-[40px] object-cover rounded-sm"
                />
                <div className="pl-3">
                  <h4 className="text-sm">{el.user} </h4>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Details;
