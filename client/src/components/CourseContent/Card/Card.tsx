import "./Card.css"
import { HStack, Progress } from "@chakra-ui/react"
import { useState } from "react"
import { MdArrowForward } from "react-icons/md"

type CourseCardProps = {
    title: string;
    isCompleted: boolean;
    videoCount: number;
    testCount: number;
    image: string;
};

const Card = ({ title, videoCount, testCount, isCompleted, image }: CourseCardProps) => {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className="card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="card__header">
                <h3 className="card__title">{title}</h3>
                <div className={`card__img-wrapper ${hovered ? 'no-bg' : ''}`}>
                    {hovered ? (
                        <MdArrowForward className="card__arrow-icon" />
                    ) : (
                        <img src={image} alt="Course card image" className="card__img" />
                    )}
                </div>

            </div>
            <div className="card__main">
                <span className="card__videos">1/{videoCount} video</span>
                <span className="card__tests">4/{testCount} tests</span>
            </div>
            <div className="card__footer">
                {isCompleted ? "" : (
                    <Progress.Root defaultValue={84} maxW="lg" variant="subtle">
                        <HStack gap="5">
                            <Progress.Track flex="1" className="card__footer__progress-track">
                                <Progress.Range className="card__footer__progress-range" />
                            </Progress.Track>
                        </HStack>
                    </Progress.Root>
                )}
                <p className="card__footer__text">
                    {isCompleted ? "Completed" : ""}
                </p>
            </div>
        </div>
    )
};

export default Card;
