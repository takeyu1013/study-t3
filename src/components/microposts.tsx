import Micropost from "./micropost";

const Microposts = () => (
  <ol>
    {[...Array<undefined>(50)].map((_, index) => {
      return (
        <li
          key={index}
          className="flex items-center gap-[10px] border-t-[1px] border-[#e8e8e8] py-[10px]"
        >
          <Micropost
            id="clf5aigzy0000ubx5mk8cywov"
            name="Yuto Takeuchi"
            image={null}
          />
        </li>
      );
    })}
  </ol>
);

export default Microposts;
