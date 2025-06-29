import "./Pricing.css";
import { useState } from "react";

const Pricing = () => {
    const [expandedCards, setExpandedCards] = useState([]);

    const toggleCardExpansion = (index) => {
        if (expandedCards.includes(index)) {
            setExpandedCards(expandedCards.filter(i => i !== index));
        } else {
            setExpandedCards([...expandedCards, index]);
        }
    };

    const pricingPlans = [
        {
            name: "Starter Pack",
            price: "Free",
            benefits: [
                "Basic meditation skills",
                "Subconscious reprogramming",
                "Daily Affirmations",
                "Occultism explained",
                "Crystals explained",
                "Frequencies explained",
                "Alchemy basics",
                "Chakras explained"
            ],
            showExpand: false
        },
        {
            name: "Balance Path",
            price: "$4.99 / month",
            benefits: [
                "Full access to Malachite AI",
                "Deep transformational meditations",
                "Combination of daily affirmations",
                "Advanced chakra activations and balancing",
                "Personalized crystal healing plans",
                "Shadow work and integration",
                "Energy anatomy and subtle body exploration",
                "Alchemy for spiritual transformation",
                "Sound healing with frequencies",
                "Dream analysis",
                "Manifesting your higher self",
                "Weekly live Q&A sessions"
            ],
            showExpand: true
        },
        {
            name: "Dark Path",
            price: "$19.99 / month",
            benefits: [
                "Full access to all courses",
                "One-on-one coaching with AI",
                "Priority support and personal guidance",
                "Advanced shadow work and deep transformation",
                "Access to secret esoteric knowledge",
                "Customized ritual crafting",
                "Master-level alchemy training",
                "Energy manipulation and psychic self-defense",
                "Personalized spiritual roadmap",
                "Invitation to elite community circles",
                "Access to rare frequency soundscapes",
                "Kundalini activation",
                "Black Magic",
                "Practices to achieve nirvana",
                "Exclusive guided rituals",
                "Kaballah explained",
                "Dream analysis and astral projection"
            ],
            showExpand: true
        }
    ];

    return (
        <section className="pricing">
            <h2 className="pricing__title">Choose Your Path</h2>
            <div className="pricing__cards">
                {pricingPlans.map((plan, index) => {
                    const isExpanded = expandedCards.includes(index);
                    const visibleBenefits = isExpanded
                        ? plan.benefits
                        : plan.benefits.slice(0, 8);
                    const hasHiddenBenefits = plan.benefits.length > 8;

                    return (
                        <div key={index} className="pricing__card">
                            <h3 className="pricing__plan">{plan.name}</h3>
                            <p className="pricing__price">{plan.price}</p>
                            <ul className="pricing__benefits">
                                {visibleBenefits.map((benefit, i) => (
                                    <li key={i}>{benefit}</li>
                                ))}
                            </ul>
                            <div className="pricing__footer">
                                {hasHiddenBenefits && plan.showExpand && (
                                    <button
                                        className="pricing__expand-btn"
                                        onClick={() => toggleCardExpansion(index)}
                                    >
                                        {isExpanded ? 'Show less' : 'Show more'}
                                    </button>
                                )}
                                <button className="pricing__btn">Explore</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Pricing;