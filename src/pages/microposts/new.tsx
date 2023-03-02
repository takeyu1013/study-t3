import type { NextPage } from "next";
import Link from "next/link";

const New: NextPage = () => {
  return (
    <>
      <h1>New Micropost</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div>
          <label>Content</label>
          <div>
            <input />
          </div>
        </div>
        <div>
          <label>User</label>
          <div>
            <input />
          </div>
        </div>
        <button type="submit">Create Micropost</button>
      </form>
      <Link href="/microposts">Back</Link>
    </>
  );
};

export default New;
