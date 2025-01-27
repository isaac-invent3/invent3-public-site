import { Box, Icon } from '@chakra-ui/react';
import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useReactFlow,
  type EdgeProps,
} from '@xyflow/react';
import { AddIcon } from '~/lib/components/CustomIcons';

interface EdgeData extends Record<string, unknown> {
  onAddNode: (id: string, orientation: 'vertical' | 'horizontal') => void;
}
export default function CustomEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps<Edge<EdgeData>>) {
  const { getEdges } = useReactFlow();

  /**
   * Counts the number of edges originating from the specified node.
   * @param {string} nodeId - Node ID to check for outgoing edges.
   * @returns {number} - Count of outgoing edges.
   */
  const countOutgoingEdges = (nodeId: string): number => {
    return getEdges().filter((edge) => edge.source === nodeId).length;
  };

  /**
   * Counts the number of edges pointing to the specified node.
   * @param {string} nodeId - Node ID to check for incoming edges.
   * @returns {number} - Count of incoming edges.
   */
  const countIncomingEdges = (nodeId: string): number => {
    return getEdges().filter((edge) => edge.target === nodeId).length;
  };

  // Generate the smooth step path for the edge.
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  /**
   * Calculates the X-coordinate for the icon's position based on edge alignment.
   * @returns {number} - X-coordinate of the icon.
   */
  const calculateIconPositionX = () => {
    if (countOutgoingEdges(source) > 1) {
      return sourceX + (targetX - sourceX) * 0.25;
    }

    if (countIncomingEdges(target) > 1) {
      return sourceX + (targetX - sourceX) * 0.75;
    }

    return labelX;
  };

  /**
   * Calculates the Y-coordinate for the icon's position based on edge alignment.
   * @returns {number} - Y-coordinate of the icon.
   */
  const calculateIconPositionY = () => {
    if (countOutgoingEdges(source) > 1) {
      return sourceY;
    }

    if (countIncomingEdges(target) > 1) {
      return targetY;
    }

    return labelY;
  };

  /**
   * Determines whether the icon should be displayed based on edge conditions.
   * @returns {boolean} - Whether to show the icon.
   */
  const shouldDisplayIcon = () => {
    if (countOutgoingEdges(source) > 1) {
      const edges = getEdges();
      const sourceEdges = edges.filter((edge) => edge.source === source);

      return target === sourceEdges[sourceEdges.length - 1]?.target;
    }

    if (countIncomingEdges(target) > 1) {
      const edges = getEdges();
      const targetEdges = edges.filter((edge) => edge.target === target);

      return source === targetEdges[targetEdges.length - 1]?.source;
    }

    return true;
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />

      <EdgeLabelRenderer>
        <Box
          position="absolute"
          w="18px"
          h="18px"
          cursor="pointer"
          borderWidth="2px"
          borderColor="#374957"
          rounded="full"
          display={shouldDisplayIcon() ? 'flex' : 'none'}
          alignItems="center"
          justifyContent="center"
          pointerEvents="all"
          background="white"
          onClick={() =>
            data?.onAddNode(
              id,
              countOutgoingEdges(source) > 1 ? 'vertical' : 'horizontal'
            )
          }
          transform={`translate(-50%, -50%) translate(${calculateIconPositionX()}px, ${calculateIconPositionY()}px)`}
        >
          <Icon as={AddIcon} boxSize="14px" color="#374957" />
        </Box>
      </EdgeLabelRenderer>
    </>
  );
}
