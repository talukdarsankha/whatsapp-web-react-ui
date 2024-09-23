import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SelectMember from "./SelectMember";
import ChatCard from "../../ChatCard/ChatCard";
import NewGroup from "./NewGroup";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/Action";

function GroupCreate({ handleCloseGroup }) {


  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Set());
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const {auth} = useSelector(store=>store);

   const token = localStorage.getItem("jwt");

   const handleRemoveMember = (item) => {
    const newGroupMember = new Set(groupMember); // Create a new Set
    newGroupMember.delete(item);                 // Remove the item from the new Set
    setGroupMember(newGroupMember);              // Update the state with the new Set
  };

  // const handleMemberAdd = (item) => {
  //   const newGroupMember = new Set(groupMember); // Create a new Set
  //   newGroupMember.add(item);                    // Add the item to the new Set
  //   setGroupMember(newGroupMember);              // Update the state with the new Set
  //   setQuery("");
  // };

  const handleMemberAdd = (item) => {
    const newGroupMember = new Set(groupMember);
  
    // Check if the item is already in the set based on a unique identifier
    if (![...newGroupMember].some(member => member.id === item.id)) {
      newGroupMember.add(item);
      setGroupMember(newGroupMember);
      setQuery(""); // Clear the search query if needed
    }
  };


  const handleSearchMember = (val) => {
   dispatch(searchUser({searchQuery:val ,token}))
  };

  const navigateBackNewGroup = () => {
    setNewGroup(false);
  };

  return (
    <div className="w-full h-full ">
      {newGroup ? (
        <NewGroup navigateBackNewGroup={navigateBackNewGroup} groupMember={groupMember} closeGroup={handleCloseGroup} />
      ) : (
        <div className="relative w-full h-full ">
          <div className="w-full flex items-center space-x-5 bg-[#008069] text-white  pt-14 px-6 pb-5">
            <BsArrowLeft
              className="cursor-pointer text-2xl font-bold"
              onClick={handleCloseGroup}
            />
            <p className="text-xl font-semibold">Add Group Members</p>
          </div>

          <div className="bg-white px-3 py-4 w-full">
            <div className="flex overflow-x-auto scrollbar-hide space-x-4 w-full">
              {groupMember.size > 0 &&
                Array.from(groupMember).map((item) => (
                  <div key={item.id} className="relative flex-none">
                    <SelectMember
                      handleRemoveMember={() => handleRemoveMember(item)}
                      member={item}
                    />
                    
                  </div>
                ))}
            </div>

            <input
              className="outline-none border-b-green-500 border-b-2 w-full p-2 mt-2"
              type="text"
              placeholder="Search Members"
              onChange={(e) => {
                handleSearchMember(e.target.value);
                setQuery(e.target.value);
              }}
              value={query}
            />
          </div>

          <div className="bg-white h-[55vh] w-full overflow-y-scroll scrollbar">
            {query && auth.searchUsers.length>0 && auth.searchUsers.map((item) => (
                <div onClick={() => handleMemberAdd(item)} >
                  
                  <ChatCard image={item.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} name={item.full_name}/>
                </div>
              ))}
          </div>

          <div className="absolute bottom-0  h-[15vh] w-full bg-slate-200 flex items-center justify-center">
            <div
              className={`${
                groupMember.size <= 0 ? "cursor-not-allowed" : ""
              } cursor-pointer bg-green-600 rounded-full w-full flex items-center justify-center`}
              onClick={() => {
                setNewGroup(true);
              }}
            >
              <BsArrowRight className="font-bold text-3xl text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupCreate;
