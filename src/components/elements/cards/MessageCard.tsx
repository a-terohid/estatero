import Agent from '@/models/agent';
import User from '@/models/user';
import { Message_Interface } from '@/types/modelTypes';
import connectDB from '@/utils/connectDB';
import { MdArrowDropDown } from 'react-icons/md';
import ReadMessage from '../buttons/ReadMessage';
import ImageWithFallback from '../ImageWithFallback';



// Function to find the sender of a message based on sender ID
const findSender = async (senderId : string)  => {
    // Establish database connection
    await connectDB()

    // Attempt to find the sender in both User and Agent collections
    const sender = await User.findById(senderId) || Agent.findById(senderId);

    return sender;
} 


// Component to render a message card with sender information and message content
const MessageCard = async ({msg , my} : {msg : Message_Interface , my:boolean}) => {

    const { _id , sender_id , message , is_read } = msg;

    // Fetch sender information
    const sender = await findSender(sender_id);

    // Destructure necessary sender fields
    const { name , last_name , email , profile_picture  } = sender;


    return (
        <div className={` px-3 py-2 ${ is_read ? "bg-primary-0" :" bg-Secondary-25"} rounded-xl text-[10px] md:text-Body-RL-XSmall lg:text-Body-RL-Small`}>
            <details className="group">
                <summary className="flex items-center justify-between cursor-pointer">
                    <div className='flex gap-x-4 items-center'>
                        {/* Display sender profile picture with fallback */}
                        <ImageWithFallback src={profile_picture || ""} alt={email} style={"rounded-b-2xl w-14"} />
                        <div className=''>
                            {/* Show 'new' label for unread messages */}
                            { !is_read && <span className='px-2 bg-Error-50 text-Error-200 rounded-md text-Body-RL-XSmall '>new</span>}
                            <p className='md:text-Body-SM-XSmall lg:text-Body-SM-Small'>{name} {last_name}</p> 
                            <p className='md:text-Body-SM-XSmall lg:text-Body-SM-Small'>{email}</p>
                        </div>     
                    </div>                  
                    <span className="text-2xl lg:text-3xl ml-3 transition-transform duration-500 group-open:rotate-45">
                        <MdArrowDropDown />
                    </span>
                </summary>

                {/* Expandable content with message details and 'Mark as Read' action */}
                <div className='scale-up-ver-top mt-3 flex flex-col gap-y-1 ml-2'>
                    <p className=''>{message}</p>
                    { my && !is_read &&  <ReadMessage _id={_id || ""} /> }
                </div>
            </details>
        </div>
    );
};

export default MessageCard;
