import type { NextPage } from "next";
import React, { useState } from "react";
import { api } from "../utils/api";

const UserIndexPage: NextPage = () => {
  const getUsers = api.user.getUsers.useQuery();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [inputContent, setInputContent] = useState("");

  const utils = api.useContext();
  const createMicropost = api.micropost.createMicropost.useMutation({
    onSuccess: async () => {
      setInputContent("");
      await utils.micropost.getUserMicroposts.invalidate();
    },
  });
  const onClickContentSubmit = () => {
    if (selectedUserId) {
      createMicropost.mutate({
        userId: selectedUserId,
        content: inputContent,
      });
    }
  };

  const getUserMicroposts = api.micropost.getUserMicroposts.useQuery(
    { userId: selectedUserId ?? "never" },
    { enabled: selectedUserId !== null }
  );

  if (!getUsers.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="container mx-auto max-w-screen-lg p-4">
        <div className="flex flex-row justify-center">
          <div className="w-1/2">
            {getUsers.data.map((user) => (
              <UserRow
                key={user.id}
                name={user.name ?? "--"}
                onSelectUser={() => setSelectedUserId(user.id)}
                isSelected={selectedUserId === user.id}
              />
            ))}
          </div>

          <div className="ml-2 w-1/2 border-l-2 border-l-gray-200 px-2">
            <div className="font-bold">詳細</div>

            {!selectedUserId && <div>ユーザーが選択されていません</div>}
            {getUserMicroposts?.data?.map(({ id, content }) => (
              <div key={id}>- {content}</div>
            ))}

            {selectedUserId && (
              <div className="m-2 rounded-sm border-2 border-gray-200 p-2">
                <label htmlFor="content">内容</label>
                <input
                  type="text"
                  id={"content"}
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  className={"border-2 border-gray-100"}
                />
                <button
                  type="button"
                  onClick={onClickContentSubmit}
                  className={"p-1 text-blue-700"}
                >
                  登録
                </button>
                {createMicropost.error && (
                  <p className="text-red-800">
                    エラー！ {createMicropost.error.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

const UserRow: React.FC<{
  name: string;
  onSelectUser: () => void;
  isSelected: boolean;
}> = ({ name, onSelectUser, isSelected }) => {
  return (
    <div className="flex flex-row space-x-3 py-2">
      <div>
        {isSelected ? "✓" : ""}
        {name}
      </div>
      <div>
        <button type="button" className="text-blue-700" onClick={onSelectUser}>
          選択
        </button>
      </div>
    </div>
  );
};

export default UserIndexPage;
