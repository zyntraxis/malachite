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

const generateSpiralPoints = (): Node[] => {
    const points: Node[] = [];
    const cx = width / 2;
    const cy = height / 2;
    const a = 2.5;
    const b = 4.2;
    const totalPoints = 120;

    for (let i = 0; i < totalPoints; i++) {
        const angle = i * 0.25 * Math.PI;
        const r = a + b * angle;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        points.push({ id: i, x, y, ox: x, oy: y });
    }
    return points;
};

const generateCrystalPoints = (): Node[] => {
    const cx = width / 2;
    const cy = height / 2;
    const points: Node[] = [];

    points.push({ id: 0, x: cx, y: cy, ox: cx, oy: cy });

    const size = 120;
    points.push({ id: 1, x: cx, y: cy - size, ox: cx, oy: cy - size });
    points.push({ id: 2, x: cx + size, y: cy, ox: cx + size, oy: cy });
    points.push({ id: 3, x: cx, y: cy + size, ox: cx, oy: cy + size });
    points.push({ id: 4, x: cx - size, y: cy, ox: cx - size, oy: cy });

    const rayCount = 4;
    for (let i = 0; i < rayCount; i++) {
        const angle = (Math.PI / 2) * i;
        for (let j = 1; j <= 3; j++) {
            const r = (size / 3) * j;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            points.push({ id: 5 + i * 3 + (j - 1), x, y, ox: x, oy: y });
        }
    }

    return points;
};

const generateCrystalLinks = (nodes: Node[]): Link[] => {
    const links: Link[] = [];

    for (let i = 1; i <= 4; i++) {
        links.push({ source: 0, target: i });
    }

    links.push({ source: 1, target: 2 });
    links.push({ source: 2, target: 3 });
    links.push({ source: 3, target: 4 });
    links.push({ source: 4, target: 1 });

    for (let i = 0; i < 4; i++) {
        const baseIndex = 5 + i * 3;
        links.push({ source: 0, target: baseIndex });
        for (let j = 0; j < 2; j++) {
            links.push({ source: baseIndex + j, target: baseIndex + j + 1 });
        }
        const vertexId = i + 1;
        links.push({ source: vertexId, target: baseIndex });
    }

    return links;
};

const generateAlchemyPoints = (): Node[] => {
    const nodes: Node[] = [];
    const cx = width / 2;
    const cy = height / 2;

    const rings = 4;
    const pointsPerRing = 30;
    const ringStep = 30;

    let id = 0;

    nodes.push({ id: id++, x: cx, y: cy, ox: cx, oy: cy });

    for (let r = 1; r <= rings; r++) {
        const radius = r * ringStep;
        for (let i = 0; i < pointsPerRing; i++) {
            const angle = (i / pointsPerRing) * 2 * Math.PI;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            nodes.push({ id: id++, x, y, ox: x, oy: y });
        }
    }

    const rays = 8;
    const rayPoints = 5;
    for (let ray = 0; ray < rays; ray++) {
        const angle = (ray / rays) * 2 * Math.PI;
        for (let i = 1; i <= rayPoints; i++) {
            const dist = i * (rings * ringStep) / rayPoints;
            const x = cx + Math.cos(angle) * dist;
            const y = cy + Math.sin(angle) * dist;
            nodes.push({ id: id++, x, y, ox: x, oy: y });
        }
    }

    return nodes;
};

const generateAlchemyLinks = (nodes: Node[]): Link[] => {
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
            .slice(0, 3);

        distances.forEach(d => {
            links.push({ source: i, target: d.idx });
        });
    }
    return links;
};

const generateNeuronPoints = (): Node[] => {
    const points: Node[] = [];
    const cx = width / 2;
    const cy = height / 2;
    const radius = 100;
    const count = 80;

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const r = Math.sqrt(Math.random()) * radius;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        points.push({ id: i, x, y, ox: x, oy: y });
    }
    return points;
};

const generateNeuronLinks = (nodes: Node[]): Link[] => {
    const links: Link[] = [];

    for (let i = 0; i < nodes.length; i++) {
        const neighbors = nodes
            .map((node, idx) => {
                if (idx === i) return null;
                const dx = nodes[i].x - node.x;
                const dy = nodes[i].y - node.y;
                return { idx, dist: dx * dx + dy * dy };
            })
            .filter((v): v is { idx: number; dist: number } => v !== null)
            .sort((a, b) => a.dist - b.dist);

        neighbors.slice(0, 3).forEach(n => {
            links.push({ source: i, target: n.idx });
        });

        const extraCount = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < extraCount; j++) {
            const randIdx = Math.floor(Math.random() * nodes.length);
            if (randIdx !== i && !neighbors.slice(0, 3).some(n => n.idx === randIdx)) {
                links.push({ source: i, target: randIdx });
            }
        }
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
            .attr("stroke", "#a1caf1")
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
                const angle = (Date.now() / 600 + d.id) % (2 * Math.PI);
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
                        <h2 className="energy-figure__item__title">Energy</h2>
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
                        <h2 className="energy-figure__item__title">Frequency</h2>
                        <p className="energy-figure__item__descr">
                            Soft resonance moving through space. Subtle, alive, eternal. A wave of frequency flowing within.
                            Click anywhere to create ripples.
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

                            const waves: Array<{
                                x: number;
                                time: number;
                                amplitude: number;
                                width: number;
                            }> = [];

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

                            svg.on("click", function (event) {
                                const [x, y] = d3.pointer(event);
                                const clickPos = x / width;

                                waves.push({
                                    x: clickPos,
                                    time: 0,
                                    amplitude: 0.4 + Math.random() * 0.2,
                                    width: 0.05 + Math.random() * 0.03
                                });
                            });

                            const freq = 0.6;
                            const speed = 1.5;

                            const animate = () => {
                                const t = Date.now() / 1000;

                                for (let i = waves.length - 1; i >= 0; i--) {
                                    waves[i].time += 0.01;
                                    if (waves[i].time > 2) {
                                        waves.splice(i, 1);
                                    }
                                }

                                for (let i = 0; i < points; i++) {
                                    const x = i / points;
                                    waveform[i][1] = Math.sin(2 * Math.PI * (x * freq) + t * speed) * 0.2;

                                    waves.forEach(wave => {
                                        const distance = Math.abs(x - wave.x);
                                        const waveEffect = Math.exp(-distance / wave.width) *
                                            Math.sin(wave.time * 10 - distance * 20) *
                                            wave.amplitude *
                                            Math.max(0, 1 - wave.time);
                                        waveform[i][1] += waveEffect;
                                    });
                                }

                                path.attr("d", line(waveform));
                                requestAnimationFrame(animate);
                            };
                            animate();
                        }}
                        style={{ width: "100%", height: "auto", display: "block", cursor: "pointer" }}
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio="xMidYMid meet"
                    />
                </li>
                <li className="energy-figure__item">
                    <div className="energy-figure__item__content">
                        <h2 className="energy-figure__item__title">Occultism</h2>
                        <p className="energy-figure__item__descr">
                            Occultism is the path to understanding the hidden laws of the Universe and the depths of the human soul through symbols, rituals, and inner transformation.
                        </p>
                    </div>
                    <svg
                        ref={(ref) => {
                            if (!ref) return;

                            const svg = d3.select(ref);
                            svg.selectAll("*").remove();
                            svg.style("background", "#171717");

                            const nodes = generateSpiralPoints();
                            const g = svg.append("g");

                            const line = d3
                                .line<Node>()
                                .x((d) => d.x)
                                .y((d) => d.y)
                                .curve(d3.curveCardinal);

                            const path = g
                                .append("path")
                                .datum(nodes)
                                .attr("fill", "none")
                                .attr("stroke", "#a1caf1")
                                .attr("stroke-opacity", 0.4)
                                .attr("stroke-width", 1.2)
                                .attr("d", line);

                            const simulation = d3.forceSimulation<Node>(nodes)
                                .force("x", d3.forceX<Node>(d => d.ox).strength(0.05))
                                .force("y", d3.forceY<Node>(d => d.oy).strength(0.05))
                                .force("collision", d3.forceCollide(5))
                                .alphaDecay(0.1)
                                .on("tick", () => {
                                    path.attr("d", line);
                                    circles
                                        .attr("cx", d => d.x)
                                        .attr("cy", d => d.y);
                                });

                            const circles = g
                                .selectAll("circle")
                                .data(nodes)
                                .join("circle")
                                .attr("r", 2)
                                .attr("fill", "#13caa6")
                                .attr("cx", (d) => d.x)
                                .attr("cy", (d) => d.y)
                                .call(
                                    d3
                                        .drag<SVGCircleElement, Node>()
                                        .on("start", (event, d) => {
                                            if (!event.active) simulation.alphaTarget(0.3).restart();
                                            d.fx = d.x;
                                            d.fy = d.y;
                                        })
                                        .on("drag", (event, d) => {
                                            d.fx = event.x;
                                            d.fy = event.y;
                                            simulation.alpha(0.3).restart();
                                        })
                                        .on("end", (event, d) => {
                                            if (!event.active) simulation.alphaTarget(0);
                                            d.fx = null;
                                            d.fy = null;
                                        })
                                );

                            const zoom = d3.zoom<SVGSVGElement, unknown>()
                                .scaleExtent([0.5, 5])
                                .on("zoom", (event) => {
                                    g.attr("transform", event.transform);
                                });

                            svg.call(zoom);
                            svg.call(
                                zoom.transform,
                                d3.zoomIdentity.translate(width / 2 - (width * 2.6) / 2, height / 2 - (height * 2.6) / 2).scale(2.6)
                            );

                            const animate = () => {
                                const t = Date.now() / 1000;
                                nodes.forEach((d, i) => {
                                    if (d.fx === undefined || d.fx === null) {
                                        const offset = 1.5;
                                        const angle = t + i * 0.1;
                                        d.ox = d.ox;
                                        d.oy = d.oy;
                                        d.x = d.ox + Math.cos(angle) * offset;
                                        d.y = d.oy + Math.sin(angle) * offset;
                                    }
                                });
                                simulation.alpha(0.1).restart();
                                requestAnimationFrame(animate);
                            };
                            animate();
                        }}
                        style={{ width: "100%", height: "auto", display: "block" }}
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio="xMidYMid meet"
                    />
                </li>
                <li className="energy-figure__item">
                    <div className="energy-figure__item__content">
                        <h2 className="energy-figure__item__title">Crystals</h2>
                        <p className="energy-figure__item__descr">
                            A crystalline structure pulsating with life. Drag points to shift the energy within this static yet dynamic form.
                        </p>
                    </div>
                    <svg
                        ref={(ref) => {
                            if (!ref) return;

                            const svg = d3.select(ref);
                            svg.selectAll("*").remove();
                            svg.style("background", "#171717");

                            const nodes = generateCrystalPoints();
                            const links = generateCrystalLinks(nodes);

                            const g = svg.append("g");

                            const link = g
                                .selectAll("line")
                                .data(links)
                                .join("line")
                                .attr("stroke", "#a1caf1")
                                .attr("stroke-width", 0.6)
                                .attr("stroke-opacity", 0.25);

                            const node = g
                                .selectAll("circle")
                                .data(nodes)
                                .join("circle")
                                .attr("r", 3)
                                .attr("fill", "#13caa6")
                                .attr("cx", d => d.x)
                                .attr("cy", d => d.y)
                                .call(
                                    d3.drag<SVGCircleElement, Node>()
                                        .on("start", (event, d) => {
                                            if (!event.active) simulation.alphaTarget(0.3).restart();
                                            d.fx = d.x;
                                            d.fy = d.y;
                                        })
                                        .on("drag", (event, d) => {
                                            d.fx = event.x;
                                            d.fy = event.y;
                                            simulation.alpha(0.3).restart();
                                        })
                                        .on("end", (event, d) => {
                                            if (!event.active) simulation.alphaTarget(0);
                                            d.fx = null;
                                            d.fy = null;
                                        })
                                );

                            const simulation = d3.forceSimulation<Node>(nodes)
                                .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(20).strength(0.4))
                                .force("charge", d3.forceManyBody<Node>().strength(-15))
                                .force("center", d3.forceCenter(width / 2, height / 2))
                                .force("x", d3.forceX<Node>(d => d.ox).strength(0.1))
                                .force("y", d3.forceY<Node>(d => d.oy).strength(0.1))
                                .force("collision", d3.forceCollide(5))
                                .alphaDecay(0.01)
                                .on("tick", () => {
                                    link
                                        .attr("x1", d => (d.source as Node).x)
                                        .attr("y1", d => (d.source as Node).y)
                                        .attr("x2", d => (d.target as Node).x)
                                        .attr("y2", d => (d.target as Node).y);

                                    node.attr("cx", d => d.x).attr("cy", d => d.y);
                                });

                            const zoom = d3.zoom<SVGSVGElement, unknown>()
                                .scaleExtent([0.5, 5])
                                .on("zoom", (event) => {
                                    g.attr("transform", event.transform);
                                });

                            svg.call(zoom);
                            svg.call(
                                zoom.transform,
                                d3.zoomIdentity.translate(width / 2 - (width * 2) / 2, height / 2 - (height * 2) / 2).scale(2)
                            );

                            const animateBreath = () => {
                                nodes.forEach(d => {
                                    if (d.fx == null && d.fy == null) {
                                        const angle = (Date.now() / 600 + d.id) % (2 * Math.PI);
                                        const radius = 2.5;
                                        d.x = d.ox + Math.cos(angle) * radius;
                                        d.y = d.oy + Math.sin(angle) * radius;
                                    }
                                });
                                simulation.alpha(0.2).restart();
                                requestAnimationFrame(animateBreath);
                            };
                            animateBreath();
                        }}
                        style={{ width: "100%", height: "auto", display: "block" }}
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio="xMidYMid meet"
                    />
                </li>
                {/* Пятая карточка Alchemy */}
                <li className="energy-figure__item">
                    <div className="energy-figure__item__content">
                        <h2 className="energy-figure__item__title">Alchemy</h2>
                        <p className="energy-figure__item__descr">
                            A mystical alchemical network composed of concentric circles and rays, embodying transformation and balance.
                        </p>
                    </div>
                    <svg
                        ref={(ref) => {
                            if (!ref) return;

                            const svg = d3.select(ref);
                            svg.selectAll("*").remove();
                            svg.style("background", "#171717");

                            const nodes = generateAlchemyPoints();
                            const links = generateAlchemyLinks(nodes);
                            const g = svg.append("g");

                            const link = g
                                .selectAll("line")
                                .data(links)
                                .join("line")
                                .attr("stroke", "#a1caf1")
                                .attr("stroke-width", 0.6)
                                .attr("stroke-opacity", 0.4);

                            const node = g
                                .selectAll("circle")
                                .data(nodes)
                                .join("circle")
                                .attr("r", 2.5)
                                .attr("fill", "#13caa6")
                                .attr("cx", d => d.x)
                                .attr("cy", d => d.y)
                                .call(
                                    d3
                                        .drag<SVGCircleElement, Node>()
                                        .on("start", (event, d) => {
                                            if (!event.active) simulation.alphaTarget(0.3).restart();
                                            d.fx = d.x;
                                            d.fy = d.y;
                                        })
                                        .on("drag", (event, d) => {
                                            d.fx = event.x;
                                            d.fy = event.y;
                                            simulation.alpha(0.3).restart();
                                        })
                                        .on("end", (event, d) => {
                                            if (!event.active) simulation.alphaTarget(0);
                                            d.fx = null;
                                            d.fy = null;
                                        })
                                );

                            const simulation = d3.forceSimulation<Node>(nodes)
                                .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(20).strength(0.5))
                                .force("charge", d3.forceManyBody<Node>().strength(-12))
                                .force("center", d3.forceCenter(width / 2, height / 2))
                                .force("collision", d3.forceCollide(3))
                                .alphaDecay(0.02)
                                .on("tick", () => {
                                    link
                                        .attr("x1", d => (d.source as Node).x)
                                        .attr("y1", d => (d.source as Node).y)
                                        .attr("x2", d => (d.target as Node).x)
                                        .attr("y2", d => (d.target as Node).y);

                                    node
                                        .attr("cx", d => d.x)
                                        .attr("cy", d => d.y);
                                });

                            const animatePulse = () => {
                                const t = Date.now() / 1000;
                                nodes.forEach((d, i) => {
                                    if (d.fx === undefined || d.fx === null) {
                                        const offset = 1.5;
                                        const angle = t + i * 0.15;
                                        d.x = d.ox + Math.cos(angle) * offset;
                                        d.y = d.oy + Math.sin(angle) * offset;
                                    }
                                });
                                simulation.alpha(0.1).restart();
                                requestAnimationFrame(animatePulse);
                            };
                            animatePulse();

                            const zoom = d3.zoom<SVGSVGElement, unknown>()
                                .scaleExtent([0.5, 5])
                                .on("zoom", (event) => {
                                    g.attr("transform", event.transform);
                                });

                            svg.call(zoom);
                            svg.call(
                                zoom.transform,
                                d3.zoomIdentity.translate(width / 2 - (width * 1.8) / 2, height / 2 - (height * 1.8) / 2).scale(1.8)
                            );
                        }}
                        style={{ width: "100%", height: "auto", display: "block" }}
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio="xMidYMid meet"
                    />
                </li>
                {/* Шестая карточка: Neuron Network */}
                <li className="energy-figure__item">
                    <div className="energy-figure__item__content">
                        <h2 className="energy-figure__item__title">Neuron Network</h2>
                        <p className="energy-figure__item__descr">
                            A dynamic neural network, mimicking the brain’s intricate web of connections. Interactive and alive.
                        </p>
                    </div>
                    <svg
                        ref={(ref) => {
                            if (!ref) return;

                            const svg = d3.select(ref);
                            svg.selectAll("*").remove();
                            svg.style("background", "#171717");

                            const nodes = generateNeuronPoints();
                            const links = generateNeuronLinks(nodes);
                            const g = svg.append("g");

                            const link = g
                                .selectAll("line")
                                .data(links)
                                .join("line")
                                .attr("stroke", "#a1caf1")
                                .attr("stroke-width", 0.7)
                                .attr("stroke-opacity", 0.5);

                            const node = g
                                .selectAll("circle")
                                .data(nodes)
                                .join("circle")
                                .attr("r", 2)
                                .attr("fill", "#13caa6")
                                .attr("cx", d => d.x)
                                .attr("cy", d => d.y)
                                .call(
                                    d3
                                        .drag<SVGCircleElement, Node>()
                                        .on("start", (event, d) => {
                                            if (!event.active) simulation.alphaTarget(0.3).restart();
                                            d.fx = d.x;
                                            d.fy = d.y;
                                        })
                                        .on("drag", (event, d) => {
                                            d.fx = event.x;
                                            d.fy = event.y;
                                            simulation.alpha(0.3).restart();
                                        })
                                        .on("end", (event, d) => {
                                            if (!event.active) simulation.alphaTarget(0);
                                            d.fx = null;
                                            d.fy = null;
                                        })
                                );

                            const simulation = d3.forceSimulation<Node>(nodes)
                                .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(15).strength(0.6))
                                .force("charge", d3.forceManyBody<Node>().strength(-15))
                                .force("center", d3.forceCenter(width / 2, height / 2))
                                .force("collision", d3.forceCollide(3))
                                .alphaDecay(0.01)
                                .on("tick", () => {
                                    link
                                        .attr("x1", d => (d.source as Node).x)
                                        .attr("y1", d => (d.source as Node).y)
                                        .attr("x2", d => (d.target as Node).x)
                                        .attr("y2", d => (d.target as Node).y);

                                    node
                                        .attr("cx", d => d.x)
                                        .attr("cy", d => d.y);
                                });

                            const animatePulse = () => {
                                const t = Date.now() / 1000;
                                nodes.forEach((d, i) => {
                                    if (d.fx === undefined || d.fx === null) {
                                        const offset = 1.2;
                                        const angle = t + i * 0.12;
                                        d.x = d.ox + Math.cos(angle) * offset;
                                        d.y = d.oy + Math.sin(angle) * offset;
                                    }
                                });
                                simulation.alpha(0.1).restart();
                                requestAnimationFrame(animatePulse);
                            };
                            animatePulse();

                            const zoom = d3.zoom<SVGSVGElement, unknown>()
                                .scaleExtent([0.5, 6])
                                .on("zoom", (event) => {
                                    g.attr("transform", event.transform);
                                });

                            svg.call(zoom);
                            svg.call(
                                zoom.transform,
                                d3.zoomIdentity.translate(width / 2 - (width * 1.9) / 2, height / 2 - (height * 1.9) / 2).scale(1.9)
                            );
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
