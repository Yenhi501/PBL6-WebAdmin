import axios from 'axios';
import { endpointServer } from './endpoint';
import { ActorDirector } from '../model/director-actor';

export const getDataActorsSelect = async (value: string) => {
  return axios
    .get(`${endpointServer}/individuals/actors`, {
      headers: { 'Content-Type': 'application/json' },
      params: { name: value },
    })
    .then((res) => {
      const data = res.data.data.actors.map((actor: ActorDirector) => {
        return {
          label: actor.name,
          key: actor.key,
          value: actor.actorId,
        };
      });
      return data;
    })
    .catch((err) => {
      console.log(err);

      return [];
    });
};

export const getDataDirectorsSelect = async (value: string) => {
  return axios
    .get(`${endpointServer}/individuals/directors`, {
      headers: { 'Content-Type': 'application/json' },
      params: { name: value },
    })
    .then((res) => {
      const data = res.data.data.directors.map((director: ActorDirector) => {
        return {
          label: director.name,
          key: director.key,
          value: director.directorId,
        };
      });
      return data;
    })
    .catch((err) => {
      console.log(err);

      return [];
    });
};
