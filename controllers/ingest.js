import express from 'express';
import { publishEvent } from '../kafka/producer.js';

const router = express.Router();

router.post('/events', async (req, res) => {
  try {
    const { type, payload } = req.body;
    
    // Validate request
    if (!type || !payload) {
      return res.status(400).json({ 
        error: 'Event type and payload are required' 
      });
    }

    const event = {
      type,
      payload,
      timestamp: new Date().toISOString()
    };

    // Publish to Kafka
    await publishEvent('events-topic', event);

    res.status(202).json({ 
      message: 'Event accepted for processing',
      eventId: event.timestamp 
    });

  } catch (error) {
    console.error('Error processing event:', error);
    res.status(500).json({ 
      error: 'Failed to process event' 
    });
  }
});

// Endpoint to receive batch events
router.post('/events/batch', async (req, res) => {
  try {
    const { events } = req.body;

    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ 
        error: 'Valid events array is required' 
      });
    }

    // Process each event
    const processPromises = events.map(async (eventData) => {
      const { type, payload } = eventData;
      
      if (!type || !payload) {
        throw new Error('Each event must have type and payload');
      }

      const event = {
        type,
        payload,
        timestamp: new Date().toISOString()
      };

      await publishEvent('events-topic', event);
      return event.timestamp;
    });

    const processedEventIds = await Promise.all(processPromises);

    res.status(202).json({
      message: 'Batch events accepted for processing',
      eventIds: processedEventIds
    });

  } catch (error) {
    console.error('Error processing batch events:', error);
    res.status(500).json({ 
      error: 'Failed to process batch events' 
    });
  }
});

export default router;