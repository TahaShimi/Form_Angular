import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { CommentService } from "../comment.service";
import { Injectable } from "@angular/core";
import { Comments } from "../comments";

@Injectable({
  providedIn : 'root'
})
export class CommentGuard{

  constructor(private commentSerivce: CommentService){}

  Resolve(
    route: ActivatedRouteSnapshot,
    State: RouterStateSnapshot,
  ){
    return this.commentSerivce.getComments();
  }
}