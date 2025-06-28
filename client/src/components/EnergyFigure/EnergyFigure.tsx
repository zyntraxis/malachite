import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./EnergyFigure.css";

const width = 600;
const height = 400;
const numPoints = 1000;

interface Node extends d3.SimulationNodeDatum {
    id: number;
    x: number;
    y: number;
    ox: number;
    oy: number;
    fx?: number | null;
    fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
    source: number | Node;
    target: number | Node;
}

const generatePoints = (): Node[] => {
    const points: Node[] = [];
    const cx = width / 2;
    const cy = height / 2;
    const radius = 125;

    while (points.length < numPoints) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy < radius * radius) {
            points.push({ id: points.length, x, y, ox: x, oy: y });
        }
    }
    return points;
};

const generateLinks = (nodes: Node[]): Link[] => {
    const links: Link[] = [];
    for (let i = 0; i < nodes.length; i++) {
        const distances = nodes
            .map((node, idx) => {
                if (idx === i) return null;
                const dx = nodes[i].x - node.x;
                const dy = nodes[i].y - node.y;
                return { idx, dist: dx * dx + dy * dy };
            })
            .filter((v): v is { idx: number; dist: number } => v !== null)
            .sort((a, b) => a.dist - b.dist)
            .slice(0, 4);

        distances.forEach((d) => {
            links.push({ source: i, target: d.idx });
        });
    }
    return links;
};

const EnergyFigure: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const nodes = generatePoints();
        const links = generateLinks(nodes);

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        svg.style("background", "#171717");

        const g = svg.append("g");

        const link = g
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke", "#13caa6")
            .attr("stroke-width", 0.3)
            .attr("stroke-opacity", 0.3);

        const node = g
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 1.5)
            .attr("fill", "#13caa6")
            .call(
                d3
                    .drag<SVGCircleElement, Node>()
                    .on("start", (event, d) => {
                        if (!event.active && simulationRef.current) simulationRef.current.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on("drag", (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on("end", (event, d) => {
                        if (!event.active && simulationRef.current) simulationRef.current.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    })
            );

        const simulation = d3
            .forceSimulation<Node>(nodes)
            .force(
                "link",
                d3
                    .forceLink<Node, Link>(links)
                    .id((d) => d.id)
                    .distance(10)
                    .strength(0.3)
            )
            .force("charge", d3.forceManyBody<Node>().strength(-5))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide<Node>(2))
            .alphaDecay(0)
            .on("tick", () => {
                link
                    .attr("x1", (d) => (d.source as Node).x)
                    .attr("y1", (d) => (d.source as Node).y)
                    .attr("x2", (d) => (d.target as Node).x)
                    .attr("y2", (d) => (d.target as Node).y);

                node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
            });

        simulationRef.current = simulation;

        const zoom = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 10])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom);

        svg.call(
            zoom.transform,
            d3.zoomIdentity.translate(width / 2 - (width * 1.4) / 2, height / 2 - (height * 1.4) / 2).scale(1.4)
        );

        const animateBreath = () => {
            nodes.forEach((d) => {
                const angle = (Date.now() / 2000 + d.id) % (2 * Math.PI);
                const radius = 1.2;
                d.x = d.ox + Math.cos(angle) * radius;
                d.y = d.oy + Math.sin(angle) * radius;
            });
            simulation.alpha(0.1).restart();
            requestAnimationFrame(animateBreath);
        };
        animateBreath();

        return () => simulation.stop();
    }, []);

    return (
        <div className="energy-figure">
            <h2 className="energy-figure__title">Spark Ideas.</h2>
            <ul className="energy-figure__list">
                <li className="energy-figure__item">
                    <div className="energy-figure__item__content">
                        <h2 className="energy-figure__item__title">Energy Graph</h2>
                        <p className="energy-figure__item__descr">
                            Explore the living network of your inner thoughts.
                            This interactive field reflects the energetic structure of your ideas.
                        </p>
                    </div>
                    <svg
                        ref={svgRef}
                        style={{ cursor: "grab", width: "100%", height: "auto", display: "block" }}
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio="xMidYMid meet"
                    />
                </li>
                <li className="energy-figure__item">
                    <div className="energy-figure__item__content">
                        <h2 className="energy-figure__item__title">Frequency Line</h2>
                        <p className="energy-figure__item__descr">
                            Soft resonance moving through space. Subtle, alive, eternal. A wave of frequency flowing within.
                        </p>
                    </div>
                    <svg
                        ref={(ref) => {
                            if (!ref) return;
                            const svg = d3.select(ref);
                            svg.selectAll("*").remove();
                            svg.style("background", "#171717");
                            svg.style("position", "absolute");
                            svg.style("bottom", "0");
                            svg.style("border-radius", "12px");

                            const points = 200;
                            const waveform: [number, number][] = [];
                            for (let i = 0; i < points; i++) {
                                waveform.push([i, 0]);
                            }

                            const xScale = d3.scaleLinear().domain([0, points - 1]).range([0, width]);
                            const yScale = d3.scaleLinear().domain([-0.6, 0.6]).range([height / 2 + 30, height / 2 - 30]);

                            const line = d3
                                .line<[number, number]>()
                                .x((d) => xScale(d[0]))
                                .y((d) => yScale(d[1]))
                                .curve(d3.curveBasis);

                            const path = svg
                                .append("path")
                                .datum(waveform)
                                .attr("fill", "none")
                                .attr("stroke", "#13caa6")
                                .attr("stroke-opacity", 0.6)
                                .attr("stroke-width", 1.4);

                            const freq = 0.6;
                            const speed = 1.5;

                            const animate = () => {
                                const t = Date.now() / 1000;
                                for (let i = 0; i < points; i++) {
                                    const x = i / points;
                                    waveform[i][1] = Math.sin(2 * Math.PI * (x * freq) + t * speed) * 0.4;
                                }
                                path.attr("d", line(waveform));
                                requestAnimationFrame(animate);
                            };
                            animate();
                        }}
                        style={{ width: "100%", height: "auto", display: "block" }}
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio="xMidYMid meet"
                    />
                </li>
            </ul>
        </div>
    );
};

export default EnergyFigure;
