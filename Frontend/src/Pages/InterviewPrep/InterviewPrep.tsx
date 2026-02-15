import { useParams } from "react-router-dom";
import moment from "moment";
import {AnimatePresence, motion} from "framer-motion"
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast} from "react-hot-toast";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import RoleInfoHeader from "./RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";

const InterviewPrep = () => {
  const {sessionId} = useParams();

  const [sessionData, setSessionData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explaination, setExplanation] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch Session Data By Session Id
  const fetchSessionDetailsById = async ()=> {
    try{
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId!)
      );

      if(response.data && response.data.session){
        setSessionData(response.data.session);
      }
    } catch(error){
      console.error("Error Fetching Session Data:", error);
    }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (question:any)=> {};

  // Pin Question
  const toggleQuestionPinStatus = async (questionId:any) => {};

  // Add More Questions To A Session
  const uploadMoreQuestions = async ()=> {};

  useEffect(()=>{
    if(sessionId){
      fetchSessionDetailsById();
    }

    return ()=> {}
  },[])

  return (<DashboardLayout>
    <RoleInfoHeader
    role = {sessionData?.role || ""}
    topicsToFocus = {sessionData?.topicsToFocus || ""}
    experience = {sessionData?.experience || "-"}
    question = {sessionData?.questions?.length || "-"}
    description = {sessionData?.description || ""}
    lastUpdated = {sessionData?.updatedAt 
      ? moment(sessionData.updatedAt).format("DD-MM-YYYY")
      : ""
    }
    />

    <div className="container mx-auto pt-4 px-4 md:px-0">
    <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

    <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
    <div className={`col-span-12 ${
      openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
    }`}>
      <AnimatePresence>
        {sessionData?.questions?.map((data:any, index:number)=>{
          return (
            <motion.div
            key= {data._id || index}
            initial={{ opacity: 0, y: -20 }}
            animate= {{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 100,
              delay: index * 0.1,
              damping: 15
            }}
            layout // This is the Key Props that Animates Position Changes
            layoutId={`question-${data._id || index}`} // Helps Framer Track Specific Items
            >

              <>
              <QuestionCard
              question = {data?.question}
              answer= {data?.answer}
              onLearnMore= {()=>{
                generateConceptExplanation(data.question);
              }}
              isPinned = {data?.isPinned}
              onTogglePin = {()=>{
                toggleQuestionPinStatus(data._id);
              }}
              />
              </>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  </div>
  </div>
  </DashboardLayout>
  );
};

export default InterviewPrep;
