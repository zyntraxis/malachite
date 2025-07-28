import "./CourseBanner.css"
import { HStack, Progress } from "@chakra-ui/react"

type CourseBannerProps = {
    type: string;
    title: string;
    descr: string;
    image: string;
    progress: number;
};

const CourseBanner = ({ type, title, image, descr, progress }: CourseBannerProps) => {
    return (
        <div className="course-banner">
            <div className="course-banner__left">
                <div>
                    <span className="course-banner__left__type">
                        {type}
                    </span>
                    <h3 className="course-banner__left__title">
                        {title}
                    </h3>
                    <p className="course-banner__left__descr">{descr}</p>
                </div>
                <Progress.Root defaultValue={progress} maxW="sm" variant="subtle">
                    <HStack gap="5">
                        <Progress.Track flex="1" className="course-banner__left__progress-track">
                            <Progress.Range className="course-banner__left__progress-range" />
                        </Progress.Track>
                        <Progress.ValueText color={"#D9D9D9"}>{progress}%</Progress.ValueText>
                    </HStack>
                </Progress.Root>
            </div>
            <div className="course-banner__right">
                <img src={image} alt="Meditation" className="course-banner__right__img" />
            </div>
        </div>
    )
};

export default CourseBanner;