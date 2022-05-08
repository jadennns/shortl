import { Dispatch, SetStateAction } from "react";

interface Props {
  dispatch: Dispatch<SetStateAction<any>>;
  placholder: string;
  name: string;
}

export default function CreateQ({ dispatch, placholder, name }: Props) {
  return (
    <div className="w-[40rem] bg-gray-100 flex items-center">
      <div className="bg-gray-200">
        <h1 className="text-gray-800 px-3 py-2 font-semibold text-base">
          {name}
        </h1>
      </div>
      <input
        type="text"
        className="outline-none px-1 py-2 w-[37rem] bg-gray-100"
        placeholder={placholder}
        onChange={(e) => dispatch(e.target.value)}
      />
    </div>
  );
}
