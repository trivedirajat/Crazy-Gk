import AuthSlice from "./Slices/AuthSlice";
import BlogSlice from "./Slices/BlogSlice";
import CurrentAffairsSlice from "./Slices/CurrentAffairsSlice";
import DailyVocabSlice from "./Slices/DailyVocabSlice";
import EBookSlice from "./Slices/EBookSlice";
import JobSlice from "./Slices/JobSlice";
import ReviewsSlice from "./Slices/ReviewsSlice";
import StudyMaterialSlice from "./Slices/StudyMaterialSlice";
import SubjectSlice from "./Slices/SubjectSlice";
import VideoSlice from "./Slices/VideoSlice";
import WhatsNewSlice from "./Slices/WhatsNewSlice";

export const rootReducer = {
    auth: AuthSlice,
    subjects: SubjectSlice,
    videos: VideoSlice,
    StudyMaterials: StudyMaterialSlice,
    CureentAffairs: CurrentAffairsSlice,
    Blogs: BlogSlice,
    WhatsNew: WhatsNewSlice,
    EBook:EBookSlice,
    DailyVocabs:DailyVocabSlice,
    Jobs: JobSlice,
    reviews:ReviewsSlice
}