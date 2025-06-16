import axios from "axios";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CommentTableItem = ({comment, fetchComments}) => {

    const {blog, createdAt, _id} = comment;
    const BlogDate = new Date(createdAt);

    const approveComment = async () => {
        try{
            const {data} = await axios.post(`/api/admin/approve-comment`, {id: _id})
            if(data.success){
                toast.success(data.message)
                fetchComments()
            }
            else{
                toast.error(data.message)
            }
        } catch(error) {
            toast.error(error.message)
        }
    }

const deleteComment = async () => {

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this comment?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#5044E5",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      const { data } = await axios.post(`/api/admin/delete-comment`, { id: _id });
      if (data.success) {
        Swal.fire("Deleted!", "The comment has been deleted.", "success");
        toast.success(data.message);
        fetchComments(); // refresh comments
      } else {
        Swal.fire("Error", "Failed to delete comment.", "error");
        toast.error(data.message);
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong.", "error");
      toast.error(error.message);
    }
  } else {
    Swal.fire("Cancelled", "The comment is safe.", "info");
  }

    }

    return (
        <tr className="order-y border-gray-300">
            <td className="px-6 py-4">
                <b className="font-medium text-gray-600">Blog</b> : {blog.title}
                <br/>
                <br/>
                <b className="font-medium text-gray-600">Name</b> : {comment.name}
                <br/>
                <b className="font-medium text-gray-600">Comment</b> : {comment.content}
            </td>
            <td className="px-6 py-4 max-sm:hidden">
                {BlogDate.toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
                <div className="inline-flex items-center gap-4">
                    {
                        !comment.isApproved ? 
                        <img onClick={approveComment} 
                        src={assets.tick_icon} alt="tick_icon" 
                        className="w-5 hover:scale-110 transition-all  cursor-pointer"/> :
                        <p className="text-xs border border-green-600 bg-green-100 text-green-600 
                        rounded-full px-3 py-1 "
                        >Approved</p>
                    }
                    <img onClick={deleteComment}
                    src={assets.bin_icon} alt="bin_icon" 
                    className="w-5 hover:scale-110 transition-all cursor-pointer" />
                </div>
            </td>
        </tr>
    )
}

export default CommentTableItem;