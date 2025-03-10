!(function () {
  'use strict'
  /*
	  @license
		Rollup.js v2.29.0
		Thu, 08 Oct 2020 04:24:04 GMT - commit 0b02e52bc7816c473784794670a2c3047ac62a07


		https://github.com/rollup/rollup

		Released under the MIT License.
	*/ for (
    var e = {}, t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', s = 0;
    s < t.length;
    s++
  )
    e[t.charCodeAt(s)] = s
  function i(e, t, s) {
    4 === s
      ? e.push([t[0], t[1], t[2], t[3]])
      : 5 === s
        ? e.push([t[0], t[1], t[2], t[3], t[4]])
        : 1 === s && e.push([t[0]])
  }
  function n(e) {
    var s = ''
    e = e < 0 ? (-e << 1) | 1 : e << 1
    do {
      var i = 31 & e
      ;(e >>>= 5) > 0 && (i |= 32), (s += t[i])
    } while (e > 0)
    return s
  }
  var r = function e(t) {
    this.bits = t instanceof e ? t.bits.slice() : []
  }
  ;(r.prototype.add = function (e) {
    this.bits[e >> 5] |= 1 << (31 & e)
  }),
    (r.prototype.has = function (e) {
      return !!(this.bits[e >> 5] & (1 << (31 & e)))
    })
  var a = function (e, t, s) {
    ;(this.start = e),
      (this.end = t),
      (this.original = s),
      (this.intro = ''),
      (this.outro = ''),
      (this.content = s),
      (this.storeName = !1),
      (this.edited = !1),
      Object.defineProperties(this, {
        previous: { writable: !0, value: null },
        next: { writable: !0, value: null }
      })
  }
  ;(a.prototype.appendLeft = function (e) {
    this.outro += e
  }),
    (a.prototype.appendRight = function (e) {
      this.intro = this.intro + e
    }),
    (a.prototype.clone = function () {
      var e = new a(this.start, this.end, this.original)
      return (
        (e.intro = this.intro),
        (e.outro = this.outro),
        (e.content = this.content),
        (e.storeName = this.storeName),
        (e.edited = this.edited),
        e
      )
    }),
    (a.prototype.contains = function (e) {
      return this.start < e && e < this.end
    }),
    (a.prototype.eachNext = function (e) {
      for (var t = this; t; ) e(t), (t = t.next)
    }),
    (a.prototype.eachPrevious = function (e) {
      for (var t = this; t; ) e(t), (t = t.previous)
    }),
    (a.prototype.edit = function (e, t, s) {
      return (
        (this.content = e),
        s || ((this.intro = ''), (this.outro = '')),
        (this.storeName = t),
        (this.edited = !0),
        this
      )
    }),
    (a.prototype.prependLeft = function (e) {
      this.outro = e + this.outro
    }),
    (a.prototype.prependRight = function (e) {
      this.intro = e + this.intro
    }),
    (a.prototype.split = function (e) {
      var t = e - this.start,
        s = this.original.slice(0, t),
        i = this.original.slice(t)
      this.original = s
      var n = new a(e, this.end, i)
      return (
        (n.outro = this.outro),
        (this.outro = ''),
        (this.end = e),
        this.edited ? (n.edit('', !1), (this.content = '')) : (this.content = s),
        (n.next = this.next),
        n.next && (n.next.previous = n),
        (n.previous = this),
        (this.next = n),
        n
      )
    }),
    (a.prototype.toString = function () {
      return this.intro + this.content + this.outro
    }),
    (a.prototype.trimEnd = function (e) {
      if (((this.outro = this.outro.replace(e, '')), this.outro.length)) return !0
      var t = this.content.replace(e, '')
      return t.length
        ? (t !== this.content && this.split(this.start + t.length).edit('', void 0, !0), !0)
        : (this.edit('', void 0, !0),
          (this.intro = this.intro.replace(e, '')),
          !!this.intro.length || void 0)
    }),
    (a.prototype.trimStart = function (e) {
      if (((this.intro = this.intro.replace(e, '')), this.intro.length)) return !0
      var t = this.content.replace(e, '')
      return t.length
        ? (t !== this.content && (this.split(this.end - t.length), this.edit('', void 0, !0)), !0)
        : (this.edit('', void 0, !0),
          (this.outro = this.outro.replace(e, '')),
          !!this.outro.length || void 0)
    })
  var o = function () {
    throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.')
  }
  'undefined' != typeof window && 'function' == typeof window.btoa
    ? (o = function (e) {
        return window.btoa(unescape(encodeURIComponent(e)))
      })
    : 'function' == typeof Buffer &&
      (o = function (e) {
        return Buffer.from(e, 'utf-8').toString('base64')
      })
  var h = function (e) {
    ;(this.version = 3),
      (this.file = e.file),
      (this.sources = e.sources),
      (this.sourcesContent = e.sourcesContent),
      (this.names = e.names),
      (this.mappings = (function (e) {
        for (var t = 0, s = 0, i = 0, r = 0, a = '', o = 0; o < e.length; o++) {
          var h = e[o]
          if ((o > 0 && (a += ';'), 0 !== h.length)) {
            for (var l = 0, c = [], u = 0, p = h; u < p.length; u++) {
              var d = p[u],
                f = n(d[0] - l)
              ;(l = d[0]),
                d.length > 1 &&
                  ((f += n(d[1] - t) + n(d[2] - s) + n(d[3] - i)),
                  (t = d[1]),
                  (s = d[2]),
                  (i = d[3])),
                5 === d.length && ((f += n(d[4] - r)), (r = d[4])),
                c.push(f)
            }
            a += c.join(',')
          }
        }
        return a
      })(e.mappings))
  }
  function l(e) {
    var t = e.split('\n'),
      s = t.filter(function (e) {
        return /^\t+/.test(e)
      }),
      i = t.filter(function (e) {
        return /^ {2,}/.test(e)
      })
    if (0 === s.length && 0 === i.length) return null
    if (s.length >= i.length) return '\t'
    var n = i.reduce(function (e, t) {
      var s = /^ +/.exec(t)[0].length
      return Math.min(s, e)
    }, 1 / 0)
    return new Array(n + 1).join(' ')
  }
  function c(e, t) {
    var s = e.split(/[/\\]/),
      i = t.split(/[/\\]/)
    for (s.pop(); s[0] === i[0]; ) s.shift(), i.shift()
    if (s.length) for (var n = s.length; n--; ) s[n] = '..'
    return s.concat(i).join('/')
  }
  ;(h.prototype.toString = function () {
    return JSON.stringify(this)
  }),
    (h.prototype.toUrl = function () {
      return 'data:application/json;charset=utf-8;base64,' + o(this.toString())
    })
  var u = Object.prototype.toString
  function p(e) {
    return '[object Object]' === u.call(e)
  }
  function d(e) {
    for (var t = e.split('\n'), s = [], i = 0, n = 0; i < t.length; i++)
      s.push(n), (n += t[i].length + 1)
    return function (e) {
      for (var t = 0, i = s.length; t < i; ) {
        var n = (t + i) >> 1
        e < s[n] ? (i = n) : (t = n + 1)
      }
      var r = t - 1
      return { line: r, column: e - s[r] }
    }
  }
  var f = function (e) {
    ;(this.hires = e),
      (this.generatedCodeLine = 0),
      (this.generatedCodeColumn = 0),
      (this.raw = []),
      (this.rawSegments = this.raw[this.generatedCodeLine] = []),
      (this.pending = null)
  }
  ;(f.prototype.addEdit = function (e, t, s, i) {
    if (t.length) {
      var n = [this.generatedCodeColumn, e, s.line, s.column]
      i >= 0 && n.push(i), this.rawSegments.push(n)
    } else this.pending && this.rawSegments.push(this.pending)
    this.advance(t), (this.pending = null)
  }),
    (f.prototype.addUneditedChunk = function (e, t, s, i, n) {
      for (var r = t.start, a = !0; r < t.end; )
        (this.hires || a || n.has(r)) &&
          this.rawSegments.push([this.generatedCodeColumn, e, i.line, i.column]),
          '\n' === s[r]
            ? ((i.line += 1),
              (i.column = 0),
              (this.generatedCodeLine += 1),
              (this.raw[this.generatedCodeLine] = this.rawSegments = []),
              (this.generatedCodeColumn = 0),
              (a = !0))
            : ((i.column += 1), (this.generatedCodeColumn += 1), (a = !1)),
          (r += 1)
      this.pending = null
    }),
    (f.prototype.advance = function (e) {
      if (e) {
        var t = e.split('\n')
        if (t.length > 1) {
          for (var s = 0; s < t.length - 1; s++)
            this.generatedCodeLine++, (this.raw[this.generatedCodeLine] = this.rawSegments = [])
          this.generatedCodeColumn = 0
        }
        this.generatedCodeColumn += t[t.length - 1].length
      }
    })
  var m = '\n',
    g = { insertLeft: !1, insertRight: !1, storeName: !1 },
    y = function (e, t) {
      void 0 === t && (t = {})
      var s = new a(0, e.length, e)
      Object.defineProperties(this, {
        original: { writable: !0, value: e },
        outro: { writable: !0, value: '' },
        intro: { writable: !0, value: '' },
        firstChunk: { writable: !0, value: s },
        lastChunk: { writable: !0, value: s },
        lastSearchedChunk: { writable: !0, value: s },
        byStart: { writable: !0, value: {} },
        byEnd: { writable: !0, value: {} },
        filename: { writable: !0, value: t.filename },
        indentExclusionRanges: { writable: !0, value: t.indentExclusionRanges },
        sourcemapLocations: { writable: !0, value: new r() },
        storedNames: { writable: !0, value: {} },
        indentStr: { writable: !0, value: l(e) }
      }),
        (this.byStart[0] = s),
        (this.byEnd[e.length] = s)
    }
  ;(y.prototype.addSourcemapLocation = function (e) {
    this.sourcemapLocations.add(e)
  }),
    (y.prototype.append = function (e) {
      if ('string' != typeof e) throw new TypeError('outro content must be a string')
      return (this.outro += e), this
    }),
    (y.prototype.appendLeft = function (e, t) {
      if ('string' != typeof t) throw new TypeError('inserted content must be a string')
      this._split(e)
      var s = this.byEnd[e]
      return s ? s.appendLeft(t) : (this.intro += t), this
    }),
    (y.prototype.appendRight = function (e, t) {
      if ('string' != typeof t) throw new TypeError('inserted content must be a string')
      this._split(e)
      var s = this.byStart[e]
      return s ? s.appendRight(t) : (this.outro += t), this
    }),
    (y.prototype.clone = function () {
      for (
        var e = new y(this.original, { filename: this.filename }),
          t = this.firstChunk,
          s = (e.firstChunk = e.lastSearchedChunk = t.clone());
        t;

      ) {
        ;(e.byStart[s.start] = s), (e.byEnd[s.end] = s)
        var i = t.next,
          n = i && i.clone()
        n && ((s.next = n), (n.previous = s), (s = n)), (t = i)
      }
      return (
        (e.lastChunk = s),
        this.indentExclusionRanges &&
          (e.indentExclusionRanges = this.indentExclusionRanges.slice()),
        (e.sourcemapLocations = new r(this.sourcemapLocations)),
        (e.intro = this.intro),
        (e.outro = this.outro),
        e
      )
    }),
    (y.prototype.generateDecodedMap = function (e) {
      var t = this
      e = e || {}
      var s = Object.keys(this.storedNames),
        i = new f(e.hires),
        n = d(this.original)
      return (
        this.intro && i.advance(this.intro),
        this.firstChunk.eachNext(function (e) {
          var r = n(e.start)
          e.intro.length && i.advance(e.intro),
            e.edited
              ? i.addEdit(0, e.content, r, e.storeName ? s.indexOf(e.original) : -1)
              : i.addUneditedChunk(0, e, t.original, r, t.sourcemapLocations),
            e.outro.length && i.advance(e.outro)
        }),
        {
          file: e.file ? e.file.split(/[/\\]/).pop() : null,
          sources: [e.source ? c(e.file || '', e.source) : null],
          sourcesContent: e.includeContent ? [this.original] : [null],
          names: s,
          mappings: i.raw
        }
      )
    }),
    (y.prototype.generateMap = function (e) {
      return new h(this.generateDecodedMap(e))
    }),
    (y.prototype.getIndentString = function () {
      return null === this.indentStr ? '\t' : this.indentStr
    }),
    (y.prototype.indent = function (e, t) {
      var s = /^[^\r\n]/gm
      if ((p(e) && ((t = e), (e = void 0)), '' === (e = void 0 !== e ? e : this.indentStr || '\t')))
        return this
      var i = {}
      ;(t = t || {}).exclude &&
        ('number' == typeof t.exclude[0] ? [t.exclude] : t.exclude).forEach(function (e) {
          for (var t = e[0]; t < e[1]; t += 1) i[t] = !0
        })
      var n = !1 !== t.indentStart,
        r = function (t) {
          return n ? '' + e + t : ((n = !0), t)
        }
      this.intro = this.intro.replace(s, r)
      for (var a = 0, o = this.firstChunk; o; ) {
        var h = o.end
        if (o.edited)
          i[a] ||
            ((o.content = o.content.replace(s, r)),
            o.content.length && (n = '\n' === o.content[o.content.length - 1]))
        else
          for (a = o.start; a < h; ) {
            if (!i[a]) {
              var l = this.original[a]
              '\n' === l
                ? (n = !0)
                : '\r' !== l &&
                  n &&
                  ((n = !1),
                  a === o.start
                    ? o.prependRight(e)
                    : (this._splitChunk(o, a), (o = o.next).prependRight(e)))
            }
            a += 1
          }
        ;(a = o.end), (o = o.next)
      }
      return (this.outro = this.outro.replace(s, r)), this
    }),
    (y.prototype.insert = function () {
      throw new Error(
        'magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)'
      )
    }),
    (y.prototype.insertLeft = function (e, t) {
      return (
        g.insertLeft ||
          (console.warn(
            'magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead'
          ),
          (g.insertLeft = !0)),
        this.appendLeft(e, t)
      )
    }),
    (y.prototype.insertRight = function (e, t) {
      return (
        g.insertRight ||
          (console.warn(
            'magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead'
          ),
          (g.insertRight = !0)),
        this.prependRight(e, t)
      )
    }),
    (y.prototype.move = function (e, t, s) {
      if (s >= e && s <= t) throw new Error('Cannot move a selection inside itself')
      this._split(e), this._split(t), this._split(s)
      var i = this.byStart[e],
        n = this.byEnd[t],
        r = i.previous,
        a = n.next,
        o = this.byStart[s]
      if (!o && n === this.lastChunk) return this
      var h = o ? o.previous : this.lastChunk
      return (
        r && (r.next = a),
        a && (a.previous = r),
        h && (h.next = i),
        o && (o.previous = n),
        i.previous || (this.firstChunk = n.next),
        n.next || ((this.lastChunk = i.previous), (this.lastChunk.next = null)),
        (i.previous = h),
        (n.next = o || null),
        h || (this.firstChunk = i),
        o || (this.lastChunk = n),
        this
      )
    }),
    (y.prototype.overwrite = function (e, t, s, i) {
      if ('string' != typeof s) throw new TypeError('replacement content must be a string')
      for (; e < 0; ) e += this.original.length
      for (; t < 0; ) t += this.original.length
      if (t > this.original.length) throw new Error('end is out of bounds')
      if (e === t)
        throw new Error(
          'Cannot overwrite a zero-length range – use appendLeft or prependRight instead'
        )
      this._split(e),
        this._split(t),
        !0 === i &&
          (g.storeName ||
            (console.warn(
              'The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string'
            ),
            (g.storeName = !0)),
          (i = { storeName: !0 }))
      var n = void 0 !== i && i.storeName,
        r = void 0 !== i && i.contentOnly
      if (n) {
        var o = this.original.slice(e, t)
        this.storedNames[o] = !0
      }
      var h = this.byStart[e],
        l = this.byEnd[t]
      if (h) {
        if (t > h.end && h.next !== this.byStart[h.end])
          throw new Error('Cannot overwrite across a split point')
        if ((h.edit(s, n, r), h !== l)) {
          for (var c = h.next; c !== l; ) c.edit('', !1), (c = c.next)
          c.edit('', !1)
        }
      } else {
        var u = new a(e, t, '').edit(s, n)
        ;(l.next = u), (u.previous = l)
      }
      return this
    }),
    (y.prototype.prepend = function (e) {
      if ('string' != typeof e) throw new TypeError('outro content must be a string')
      return (this.intro = e + this.intro), this
    }),
    (y.prototype.prependLeft = function (e, t) {
      if ('string' != typeof t) throw new TypeError('inserted content must be a string')
      this._split(e)
      var s = this.byEnd[e]
      return s ? s.prependLeft(t) : (this.intro = t + this.intro), this
    }),
    (y.prototype.prependRight = function (e, t) {
      if ('string' != typeof t) throw new TypeError('inserted content must be a string')
      this._split(e)
      var s = this.byStart[e]
      return s ? s.prependRight(t) : (this.outro = t + this.outro), this
    }),
    (y.prototype.remove = function (e, t) {
      for (; e < 0; ) e += this.original.length
      for (; t < 0; ) t += this.original.length
      if (e === t) return this
      if (e < 0 || t > this.original.length) throw new Error('Character is out of bounds')
      if (e > t) throw new Error('end must be greater than start')
      this._split(e), this._split(t)
      for (var s = this.byStart[e]; s; )
        (s.intro = ''), (s.outro = ''), s.edit(''), (s = t > s.end ? this.byStart[s.end] : null)
      return this
    }),
    (y.prototype.lastChar = function () {
      if (this.outro.length) return this.outro[this.outro.length - 1]
      var e = this.lastChunk
      do {
        if (e.outro.length) return e.outro[e.outro.length - 1]
        if (e.content.length) return e.content[e.content.length - 1]
        if (e.intro.length) return e.intro[e.intro.length - 1]
      } while ((e = e.previous))
      return this.intro.length ? this.intro[this.intro.length - 1] : ''
    }),
    (y.prototype.lastLine = function () {
      var e = this.outro.lastIndexOf(m)
      if (-1 !== e) return this.outro.substr(e + 1)
      var t = this.outro,
        s = this.lastChunk
      do {
        if (s.outro.length > 0) {
          if (-1 !== (e = s.outro.lastIndexOf(m))) return s.outro.substr(e + 1) + t
          t = s.outro + t
        }
        if (s.content.length > 0) {
          if (-1 !== (e = s.content.lastIndexOf(m))) return s.content.substr(e + 1) + t
          t = s.content + t
        }
        if (s.intro.length > 0) {
          if (-1 !== (e = s.intro.lastIndexOf(m))) return s.intro.substr(e + 1) + t
          t = s.intro + t
        }
      } while ((s = s.previous))
      return -1 !== (e = this.intro.lastIndexOf(m)) ? this.intro.substr(e + 1) + t : this.intro + t
    }),
    (y.prototype.slice = function (e, t) {
      for (void 0 === e && (e = 0), void 0 === t && (t = this.original.length); e < 0; )
        e += this.original.length
      for (; t < 0; ) t += this.original.length
      for (var s = '', i = this.firstChunk; i && (i.start > e || i.end <= e); ) {
        if (i.start < t && i.end >= t) return s
        i = i.next
      }
      if (i && i.edited && i.start !== e)
        throw new Error('Cannot use replaced character ' + e + ' as slice start anchor.')
      for (var n = i; i; ) {
        !i.intro || (n === i && i.start !== e) || (s += i.intro)
        var r = i.start < t && i.end >= t
        if (r && i.edited && i.end !== t)
          throw new Error('Cannot use replaced character ' + t + ' as slice end anchor.')
        var a = n === i ? e - i.start : 0,
          o = r ? i.content.length + t - i.end : i.content.length
        if (((s += i.content.slice(a, o)), !i.outro || (r && i.end !== t) || (s += i.outro), r))
          break
        i = i.next
      }
      return s
    }),
    (y.prototype.snip = function (e, t) {
      var s = this.clone()
      return s.remove(0, e), s.remove(t, s.original.length), s
    }),
    (y.prototype._split = function (e) {
      if (!this.byStart[e] && !this.byEnd[e])
        for (var t = this.lastSearchedChunk, s = e > t.end; t; ) {
          if (t.contains(e)) return this._splitChunk(t, e)
          t = s ? this.byStart[t.end] : this.byEnd[t.start]
        }
    }),
    (y.prototype._splitChunk = function (e, t) {
      if (e.edited && e.content.length) {
        var s = d(this.original)(t)
        throw new Error(
          'Cannot split a chunk that has already been edited (' +
            s.line +
            ':' +
            s.column +
            ' – "' +
            e.original +
            '")'
        )
      }
      var i = e.split(t)
      return (
        (this.byEnd[t] = e),
        (this.byStart[t] = i),
        (this.byEnd[i.end] = i),
        e === this.lastChunk && (this.lastChunk = i),
        (this.lastSearchedChunk = e),
        !0
      )
    }),
    (y.prototype.toString = function () {
      for (var e = this.intro, t = this.firstChunk; t; ) (e += t.toString()), (t = t.next)
      return e + this.outro
    }),
    (y.prototype.isEmpty = function () {
      var e = this.firstChunk
      do {
        if (
          (e.intro.length && e.intro.trim()) ||
          (e.content.length && e.content.trim()) ||
          (e.outro.length && e.outro.trim())
        )
          return !1
      } while ((e = e.next))
      return !0
    }),
    (y.prototype.length = function () {
      var e = this.firstChunk,
        t = 0
      do {
        t += e.intro.length + e.content.length + e.outro.length
      } while ((e = e.next))
      return t
    }),
    (y.prototype.trimLines = function () {
      return this.trim('[\\r\\n]')
    }),
    (y.prototype.trim = function (e) {
      return this.trimStart(e).trimEnd(e)
    }),
    (y.prototype.trimEndAborted = function (e) {
      var t = new RegExp((e || '\\s') + '+$')
      if (((this.outro = this.outro.replace(t, '')), this.outro.length)) return !0
      var s = this.lastChunk
      do {
        var i = s.end,
          n = s.trimEnd(t)
        if (
          (s.end !== i &&
            (this.lastChunk === s && (this.lastChunk = s.next),
            (this.byEnd[s.end] = s),
            (this.byStart[s.next.start] = s.next),
            (this.byEnd[s.next.end] = s.next)),
          n)
        )
          return !0
        s = s.previous
      } while (s)
      return !1
    }),
    (y.prototype.trimEnd = function (e) {
      return this.trimEndAborted(e), this
    }),
    (y.prototype.trimStartAborted = function (e) {
      var t = new RegExp('^' + (e || '\\s') + '+')
      if (((this.intro = this.intro.replace(t, '')), this.intro.length)) return !0
      var s = this.firstChunk
      do {
        var i = s.end,
          n = s.trimStart(t)
        if (
          (s.end !== i &&
            (s === this.lastChunk && (this.lastChunk = s.next),
            (this.byEnd[s.end] = s),
            (this.byStart[s.next.start] = s.next),
            (this.byEnd[s.next.end] = s.next)),
          n)
        )
          return !0
        s = s.next
      } while (s)
      return !1
    }),
    (y.prototype.trimStart = function (e) {
      return this.trimStartAborted(e), this
    })
  var x = Object.prototype.hasOwnProperty,
    v = function (e) {
      void 0 === e && (e = {}),
        (this.intro = e.intro || ''),
        (this.separator = void 0 !== e.separator ? e.separator : '\n'),
        (this.sources = []),
        (this.uniqueSources = []),
        (this.uniqueSourceIndexByFilename = {})
    }
  function E(e, t) {
    const s = e.split(/[/\\]/).filter(Boolean),
      i = t.split(/[/\\]/).filter(Boolean)
    for ('.' === s[0] && s.shift(), '.' === i[0] && i.shift(); s[0] && i[0] && s[0] === i[0]; )
      s.shift(), i.shift()
    for (; '..' === i[0] && s.length > 0; ) i.shift(), s.pop()
    for (; s.pop(); ) i.unshift('..')
    return i.join('/')
  }
  function b(e, t, s, i) {
    if ((t.remove(s, i), e.annotations))
      for (const i of e.annotations) {
        if (!(i.start < s)) return
        t.remove(i.start, i.end)
      }
  }
  function S(e, t) {
    if ((e.annotations || 'ExpressionStatement' !== e.parent.type || (e = e.parent), e.annotations))
      for (const s of e.annotations) t.remove(s.start, s.end)
  }
  ;(v.prototype.addSource = function (e) {
    if (e instanceof y)
      return this.addSource({ content: e, filename: e.filename, separator: this.separator })
    if (!p(e) || !e.content)
      throw new Error(
        'bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`'
      )
    if (
      (['filename', 'indentExclusionRanges', 'separator'].forEach(function (t) {
        x.call(e, t) || (e[t] = e.content[t])
      }),
      void 0 === e.separator && (e.separator = this.separator),
      e.filename)
    )
      if (x.call(this.uniqueSourceIndexByFilename, e.filename)) {
        var t = this.uniqueSources[this.uniqueSourceIndexByFilename[e.filename]]
        if (e.content.original !== t.content)
          throw new Error('Illegal source: same filename (' + e.filename + '), different contents')
      } else
        (this.uniqueSourceIndexByFilename[e.filename] = this.uniqueSources.length),
          this.uniqueSources.push({ filename: e.filename, content: e.content.original })
    return this.sources.push(e), this
  }),
    (v.prototype.append = function (e, t) {
      return this.addSource({ content: new y(e), separator: (t && t.separator) || '' }), this
    }),
    (v.prototype.clone = function () {
      var e = new v({ intro: this.intro, separator: this.separator })
      return (
        this.sources.forEach(function (t) {
          e.addSource({ filename: t.filename, content: t.content.clone(), separator: t.separator })
        }),
        e
      )
    }),
    (v.prototype.generateDecodedMap = function (e) {
      var t = this
      void 0 === e && (e = {})
      var s = []
      this.sources.forEach(function (e) {
        Object.keys(e.content.storedNames).forEach(function (e) {
          ~s.indexOf(e) || s.push(e)
        })
      })
      var i = new f(e.hires)
      return (
        this.intro && i.advance(this.intro),
        this.sources.forEach(function (e, n) {
          n > 0 && i.advance(t.separator)
          var r = e.filename ? t.uniqueSourceIndexByFilename[e.filename] : -1,
            a = e.content,
            o = d(a.original)
          a.intro && i.advance(a.intro),
            a.firstChunk.eachNext(function (t) {
              var n = o(t.start)
              t.intro.length && i.advance(t.intro),
                e.filename
                  ? t.edited
                    ? i.addEdit(r, t.content, n, t.storeName ? s.indexOf(t.original) : -1)
                    : i.addUneditedChunk(r, t, a.original, n, a.sourcemapLocations)
                  : i.advance(t.content),
                t.outro.length && i.advance(t.outro)
            }),
            a.outro && i.advance(a.outro)
        }),
        {
          file: e.file ? e.file.split(/[/\\]/).pop() : null,
          sources: this.uniqueSources.map(function (t) {
            return e.file ? c(e.file, t.filename) : t.filename
          }),
          sourcesContent: this.uniqueSources.map(function (t) {
            return e.includeContent ? t.content : null
          }),
          names: s,
          mappings: i.raw
        }
      )
    }),
    (v.prototype.generateMap = function (e) {
      return new h(this.generateDecodedMap(e))
    }),
    (v.prototype.getIndentString = function () {
      var e = {}
      return (
        this.sources.forEach(function (t) {
          var s = t.content.indentStr
          null !== s && (e[s] || (e[s] = 0), (e[s] += 1))
        }),
        Object.keys(e).sort(function (t, s) {
          return e[t] - e[s]
        })[0] || '\t'
      )
    }),
    (v.prototype.indent = function (e) {
      var t = this
      if ((arguments.length || (e = this.getIndentString()), '' === e)) return this
      var s = !this.intro || '\n' === this.intro.slice(-1)
      return (
        this.sources.forEach(function (i, n) {
          var r = void 0 !== i.separator ? i.separator : t.separator,
            a = s || (n > 0 && /\r?\n$/.test(r))
          i.content.indent(e, { exclude: i.indentExclusionRanges, indentStart: a }),
            (s = '\n' === i.content.lastChar())
        }),
        this.intro &&
          (this.intro =
            e +
            this.intro.replace(/^[^\n]/gm, function (t, s) {
              return s > 0 ? e + t : t
            })),
        this
      )
    }),
    (v.prototype.prepend = function (e) {
      return (this.intro = e + this.intro), this
    }),
    (v.prototype.toString = function () {
      var e = this,
        t = this.sources
          .map(function (t, s) {
            var i = void 0 !== t.separator ? t.separator : e.separator
            return (s > 0 ? i : '') + t.content.toString()
          })
          .join('')
      return this.intro + t
    }),
    (v.prototype.isEmpty = function () {
      return !(
        (this.intro.length && this.intro.trim()) ||
        this.sources.some(function (e) {
          return !e.content.isEmpty()
        })
      )
    }),
    (v.prototype.length = function () {
      return this.sources.reduce(function (e, t) {
        return e + t.content.length()
      }, this.intro.length)
    }),
    (v.prototype.trimLines = function () {
      return this.trim('[\\r\\n]')
    }),
    (v.prototype.trim = function (e) {
      return this.trimStart(e).trimEnd(e)
    }),
    (v.prototype.trimStart = function (e) {
      var t = new RegExp('^' + (e || '\\s') + '+')
      if (((this.intro = this.intro.replace(t, '')), !this.intro)) {
        var s,
          i = 0
        do {
          if (!(s = this.sources[i++])) break
        } while (!s.content.trimStartAborted(e))
      }
      return this
    }),
    (v.prototype.trimEnd = function (e) {
      var t,
        s = new RegExp((e || '\\s') + '+$'),
        i = this.sources.length - 1
      do {
        if (!(t = this.sources[i--])) {
          this.intro = this.intro.replace(s, '')
          break
        }
      } while (!t.content.trimEndAborted(e))
      return this
    })
  const _ = { isNoStatement: !0 }
  function A(e, t, s = 0) {
    let i, n
    for (i = e.indexOf(t, s); ; ) {
      if (-1 === (s = e.indexOf('/', s)) || s >= i) return i
      ;(n = e.charCodeAt(++s)),
        ++s,
        (s = 47 === n ? e.indexOf('\n', s) + 1 : e.indexOf('*/', s) + 2) > i &&
          (i = e.indexOf(t, s))
    }
  }
  const k = /\s/
  function C(e, t) {
    for (; t < e.length && k.test(e[t]); ) t++
    return t
  }
  function w(e) {
    let t,
      s,
      i = 0
    for (t = e.indexOf('\n', i); ; ) {
      if (((i = e.indexOf('/', i)), -1 === i || i > t)) return [t, t + 1]
      if (((s = e.charCodeAt(i + 1)), 47 === s)) return [i, t + 1]
      ;(i = e.indexOf('*/', i + 3) + 2), i > t && (t = e.indexOf('\n', i))
    }
  }
  function P(e, t, s, i, n) {
    let r,
      a,
      o,
      h,
      l = e[0],
      c = !l.included || l.needsBoundaries
    c && (h = s + w(t.original.slice(s, l.start))[1])
    for (let s = 1; s <= e.length; s++)
      (r = l),
        (a = h),
        (o = c),
        (l = e[s]),
        (c = void 0 !== l && (!l.included || l.needsBoundaries)),
        o || c
          ? ((h = r.end + w(t.original.slice(r.end, void 0 === l ? i : l.start))[1]),
            r.included
              ? o
                ? r.render(t, n, { end: h, start: a })
                : r.render(t, n)
              : b(r, t, a, h))
          : r.render(t, n)
  }
  function I(e, t, s, i) {
    const n = []
    let r,
      a,
      o,
      h,
      l,
      c = s - 1
    for (let i = 0; i < e.length; i++) {
      for (
        a = e[i],
          void 0 !== r && (c = r.end + A(t.original.slice(r.end, a.start), ',')),
          o = h = c + 1 + w(t.original.slice(c + 1, a.start))[1];
        (l = t.original.charCodeAt(o)), 32 === l || 9 === l || 10 === l || 13 === l;

      )
        o++
      void 0 !== r && n.push({ contentEnd: h, end: o, node: r, separator: c, start: s }),
        (r = a),
        (s = o)
    }
    return n.push({ contentEnd: i, end: i, node: r, separator: null, start: s }), n
  }
  function N(e, t, s) {
    for (;;) {
      const [i, n] = w(e.original.slice(t, s))
      if (-1 === i) break
      e.remove(t + i, (t += n))
    }
  }
  function T(e, t) {
    const s = t.compact ? '' : ' '
    if (1 === e.length && 1 === t.exportNamesByVariable.get(e[0]).length) {
      const i = e[0]
      return `exports('${t.exportNamesByVariable.get(i)}',${s}${i.getName()})`
    }
    return `exports({${s}${e
      .map((e) =>
        t.exportNamesByVariable
          .get(e)
          .map((t) => `${t}:${s}${e.getName()}`)
          .join(',' + s)
      )
      .join(',' + s)}${s}})`
  }
  function L(e, t, s) {
    const i = s.compact ? '' : ' ',
      n = s.compact ? '' : ';'
    return `function${i}(v)${i}{${i}return exports({${i}${e
      .map((e) =>
        s.exportNamesByVariable
          .get(e)
          .map((s) => `${s}:${i}${t ? e.getName() : 'v'}`)
          .join(',' + i)
      )
      .join(',' + i)}${i}}),${i}v${n}${i}}(`
  }
  function M(e) {
    let t = ''
    do {
      const s = e % 64
      ;(e = Math.floor(e / 64)),
        (t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$'[s] + t)
    } while (0 !== e)
    return t
  }
  const R = {
    __proto__: null,
    await: !0,
    break: !0,
    case: !0,
    catch: !0,
    class: !0,
    const: !0,
    continue: !0,
    debugger: !0,
    default: !0,
    delete: !0,
    do: !0,
    else: !0,
    enum: !0,
    eval: !0,
    export: !0,
    extends: !0,
    false: !0,
    finally: !0,
    for: !0,
    function: !0,
    if: !0,
    implements: !0,
    import: !0,
    in: !0,
    instanceof: !0,
    interface: !0,
    let: !0,
    new: !0,
    null: !0,
    package: !0,
    private: !0,
    protected: !0,
    public: !0,
    return: !0,
    static: !0,
    super: !0,
    switch: !0,
    this: !0,
    throw: !0,
    true: !0,
    try: !0,
    typeof: !0,
    undefined: !0,
    var: !0,
    void: !0,
    while: !0,
    with: !0,
    yield: !0
  }
  function $(e, t) {
    let s = e,
      i = 1
    for (; t.has(s) || R[s]; ) s = `${e}$${M(i++)}`
    return t.add(s), s
  }
  const O = []
  function V(e, t, s) {
    const i = e.get(t)
    if (i) return i
    const n = s()
    return e.set(t, n), n
  }
  const D = Symbol('Unknown Key'),
    B = [],
    F = [D],
    W = Symbol('Entities')
  class U {
    constructor() {
      this.entityPaths = Object.create(null, { [W]: { value: new Set() } })
    }
    getEntities(e) {
      let t = this.entityPaths
      for (const s of e) t = t[s] = t[s] || Object.create(null, { [W]: { value: new Set() } })
      return t[W]
    }
  }
  const j = new U()
  class z {
    constructor() {
      this.entityPaths = Object.create(null, { [W]: { value: new Map() } })
    }
    getEntities(e, t) {
      let s = this.entityPaths
      for (const t of e) s = s[t] = s[t] || Object.create(null, { [W]: { value: new Map() } })
      return V(s[W], t, () => new Set())
    }
  }
  function G(e, t = null) {
    return Object.create(t, e)
  }
  const H = Symbol('Unknown Value'),
    q = {
      deoptimizePath: () => {},
      getLiteralValueAtPath: () => H,
      getReturnExpressionWhenCalledAtPath: () => q,
      hasEffectsWhenAccessedAtPath: (e) => e.length > 0,
      hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
      hasEffectsWhenCalledAtPath: () => !0,
      include: () => {},
      includeCallArguments(e, t) {
        for (const s of t) s.include(e, !1)
      },
      included: !0,
      toString: () => '[[UNKNOWN]]'
    },
    K = {
      deoptimizePath: () => {},
      getLiteralValueAtPath: () => {},
      getReturnExpressionWhenCalledAtPath: () => q,
      hasEffectsWhenAccessedAtPath: (e) => e.length > 0,
      hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
      hasEffectsWhenCalledAtPath: () => !0,
      include: () => {},
      includeCallArguments() {},
      included: !0,
      toString: () => 'undefined'
    },
    X = { value: { callsArgs: null, mutatesSelf: !1, returns: null, returnsPrimitive: q } },
    Y = { value: { returns: null, returnsPrimitive: q, callsArgs: null, mutatesSelf: !0 } },
    Q = { value: { returns: null, returnsPrimitive: q, callsArgs: [0], mutatesSelf: !1 } }
  class J {
    constructor() {
      this.included = !1
    }
    deoptimizePath() {}
    getLiteralValueAtPath() {
      return H
    }
    getReturnExpressionWhenCalledAtPath(e) {
      return 1 === e.length ? ve(fe, e[0]) : q
    }
    hasEffectsWhenAccessedAtPath(e) {
      return e.length > 1
    }
    hasEffectsWhenAssignedAtPath(e) {
      return e.length > 1
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return 1 !== e.length || xe(fe, e[0], this.included, t, s)
    }
    include() {
      this.included = !0
    }
    includeCallArguments(e, t) {
      for (const s of t) s.include(e, !1)
    }
    toString() {
      return '[[UNKNOWN ARRAY]]'
    }
  }
  const Z = { value: { callsArgs: null, mutatesSelf: !1, returns: J, returnsPrimitive: null } },
    ee = { value: { callsArgs: null, mutatesSelf: !0, returns: J, returnsPrimitive: null } },
    te = { value: { callsArgs: [0], mutatesSelf: !1, returns: J, returnsPrimitive: null } },
    se = { value: { callsArgs: [0], mutatesSelf: !0, returns: J, returnsPrimitive: null } },
    ie = {
      deoptimizePath: () => {},
      getLiteralValueAtPath: () => H,
      getReturnExpressionWhenCalledAtPath: (e) => (1 === e.length ? ve(me, e[0]) : q),
      hasEffectsWhenAccessedAtPath: (e) => e.length > 1,
      hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
      hasEffectsWhenCalledAtPath: (e) => {
        if (1 === e.length) {
          const t = e[0]
          return 'string' != typeof t || !me[t]
        }
        return !0
      },
      include: () => {},
      includeCallArguments(e, t) {
        for (const s of t) s.include(e, !1)
      },
      included: !0,
      toString: () => '[[UNKNOWN BOOLEAN]]'
    },
    ne = { value: { callsArgs: null, mutatesSelf: !1, returns: null, returnsPrimitive: ie } },
    re = { value: { callsArgs: [0], mutatesSelf: !1, returns: null, returnsPrimitive: ie } },
    ae = {
      deoptimizePath: () => {},
      getLiteralValueAtPath: () => H,
      getReturnExpressionWhenCalledAtPath: (e) => (1 === e.length ? ve(ge, e[0]) : q),
      hasEffectsWhenAccessedAtPath: (e) => e.length > 1,
      hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
      hasEffectsWhenCalledAtPath: (e) => {
        if (1 === e.length) {
          const t = e[0]
          return 'string' != typeof t || !ge[t]
        }
        return !0
      },
      include: () => {},
      includeCallArguments(e, t) {
        for (const s of t) s.include(e, !1)
      },
      included: !0,
      toString: () => '[[UNKNOWN NUMBER]]'
    },
    oe = { value: { callsArgs: null, mutatesSelf: !1, returns: null, returnsPrimitive: ae } },
    he = { value: { callsArgs: null, mutatesSelf: !0, returns: null, returnsPrimitive: ae } },
    le = { value: { callsArgs: [0], mutatesSelf: !1, returns: null, returnsPrimitive: ae } },
    ce = {
      deoptimizePath: () => {},
      getLiteralValueAtPath: () => H,
      getReturnExpressionWhenCalledAtPath: (e) => (1 === e.length ? ve(ye, e[0]) : q),
      hasEffectsWhenAccessedAtPath: (e) => e.length > 1,
      hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
      hasEffectsWhenCalledAtPath: (e, t, s) => 1 !== e.length || xe(ye, e[0], !0, t, s),
      include: () => {},
      includeCallArguments(e, t) {
        for (const s of t) s.include(e, !1)
      },
      included: !0,
      toString: () => '[[UNKNOWN STRING]]'
    },
    ue = { value: { callsArgs: null, mutatesSelf: !1, returns: null, returnsPrimitive: ce } }
  class pe {
    constructor() {
      this.included = !1
    }
    deoptimizePath() {}
    getLiteralValueAtPath() {
      return H
    }
    getReturnExpressionWhenCalledAtPath(e) {
      return 1 === e.length ? ve(de, e[0]) : q
    }
    hasEffectsWhenAccessedAtPath(e) {
      return e.length > 1
    }
    hasEffectsWhenAssignedAtPath(e) {
      return e.length > 1
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return 1 !== e.length || xe(de, e[0], this.included, t, s)
    }
    include() {
      this.included = !0
    }
    includeCallArguments(e, t) {
      for (const s of t) s.include(e, !1)
    }
    toString() {
      return '[[UNKNOWN OBJECT]]'
    }
  }
  const de = G({
      hasOwnProperty: ne,
      isPrototypeOf: ne,
      propertyIsEnumerable: ne,
      toLocaleString: ue,
      toString: ue,
      valueOf: X
    }),
    fe = G(
      {
        concat: Z,
        copyWithin: ee,
        every: re,
        fill: ee,
        filter: te,
        find: Q,
        findIndex: le,
        forEach: Q,
        includes: ne,
        indexOf: oe,
        join: ue,
        lastIndexOf: oe,
        map: te,
        pop: Y,
        push: he,
        reduce: Q,
        reduceRight: Q,
        reverse: ee,
        shift: Y,
        slice: Z,
        some: re,
        sort: se,
        splice: ee,
        unshift: he
      },
      de
    ),
    me = G({ valueOf: ne }, de),
    ge = G(
      { toExponential: ue, toFixed: ue, toLocaleString: ue, toPrecision: ue, valueOf: oe },
      de
    ),
    ye = G(
      {
        charAt: ue,
        charCodeAt: oe,
        codePointAt: oe,
        concat: ue,
        endsWith: ne,
        includes: ne,
        indexOf: oe,
        lastIndexOf: oe,
        localeCompare: oe,
        match: ne,
        normalize: ue,
        padEnd: ue,
        padStart: ue,
        repeat: ue,
        replace: {
          value: { callsArgs: [1], mutatesSelf: !1, returns: null, returnsPrimitive: ce }
        },
        search: oe,
        slice: ue,
        split: Z,
        startsWith: ne,
        substr: ue,
        substring: ue,
        toLocaleLowerCase: ue,
        toLocaleUpperCase: ue,
        toLowerCase: ue,
        toUpperCase: ue,
        trim: ue,
        valueOf: ue
      },
      de
    )
  function xe(e, t, s, i, n) {
    if ('string' != typeof t || !e[t] || (e[t].mutatesSelf && s)) return !0
    if (!e[t].callsArgs) return !1
    for (const s of e[t].callsArgs)
      if (i.args[s] && i.args[s].hasEffectsWhenCalledAtPath(B, { args: O, withNew: !1 }, n))
        return !0
    return !1
  }
  function ve(e, t) {
    return 'string' == typeof t && e[t]
      ? null !== e[t].returnsPrimitive
        ? e[t].returnsPrimitive
        : new e[t].returns()
      : q
  }
  class Ee {
    constructor(e) {
      ;(this.alwaysRendered = !1),
        (this.included = !1),
        (this.isId = !1),
        (this.isReassigned = !1),
        (this.renderBaseName = null),
        (this.renderName = null),
        (this.name = e)
    }
    addReference(e) {}
    deoptimizePath(e) {}
    getBaseVariableName() {
      return this.renderBaseName || this.renderName || this.name
    }
    getLiteralValueAtPath(e, t, s) {
      return H
    }
    getName() {
      const e = this.renderName || this.name
      return this.renderBaseName ? `${this.renderBaseName}${R[e] ? `['${e}']` : '.' + e}` : e
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      return q
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      return e.length > 0
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return !0
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return !0
    }
    include() {
      this.included = !0
    }
    includeCallArguments(e, t) {
      for (const s of t) s.include(e, !1)
    }
    markCalledFromTryStatement() {}
    setRenderNames(e, t) {
      ;(this.renderBaseName = e), (this.renderName = t)
    }
  }
  class be extends Ee {
    constructor(e, t) {
      super(t), (this.module = e), (this.isNamespace = '*' === t), (this.referenced = !1)
    }
    addReference(e) {
      ;(this.referenced = !0),
        ('default' !== this.name && '*' !== this.name) || this.module.suggestName(e.name)
    }
    include() {
      this.included || ((this.included = !0), (this.module.used = !0))
    }
  }
  const Se =
      'break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public'.split(
        ' '
      ),
    _e =
      'Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl'.split(
        ' '
      ),
    Ae = new Set(Se.concat(_e)),
    ke = /[^$_a-zA-Z0-9]/g,
    Ce = (e) => /\d/.test(e[0])
  function we(e) {
    return (
      (e = e.replace(/-(\w)/g, (e, t) => t.toUpperCase()).replace(ke, '_')),
      (Ce(e) || Ae.has(e)) && (e = '_' + e),
      e || '_'
    )
  }
  const Pe = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/,
    Ie = /^\.?\.\//
  function Ne(e) {
    return Pe.test(e)
  }
  function Te(e) {
    return Ie.test(e)
  }
  function Le(e) {
    return e.replace(/\\/g, '/')
  }
  function Me(e) {
    return e.split(/(\/|\\)/).pop()
  }
  function Re(e) {
    const t = /(\/|\\)[^/\\]*$/.exec(e)
    return t ? e.slice(0, -t[0].length) || '/' : '.'
  }
  function $e(e) {
    const t = /\.[^.]+$/.exec(Me(e))
    return t ? t[0] : ''
  }
  function Oe(e, t) {
    const s = e.split(/[/\\]/).filter(Boolean),
      i = t.split(/[/\\]/).filter(Boolean)
    for ('.' === s[0] && s.shift(), '.' === i[0] && i.shift(); s[0] && i[0] && s[0] === i[0]; )
      s.shift(), i.shift()
    for (; '..' === i[0] && s.length > 0; ) i.shift(), s.pop()
    for (; s.pop(); ) i.unshift('..')
    return i.join('/')
  }
  function Ve(...e) {
    let t = e.shift().split(/[/\\]/)
    return (
      e.forEach((e) => {
        if (Ne(e)) t = e.split(/[/\\]/)
        else {
          const s = e.split(/[/\\]/)
          for (; '.' === s[0] || '..' === s[0]; ) '..' === s.shift() && t.pop()
          t.push.apply(t, s)
        }
      }),
      t.join('/')
    )
  }
  class De {
    constructor(e, t, s, i) {
      ;(this.options = e),
        (this.id = t),
        (this.moduleSideEffects = s),
        (this.meta = i),
        (this.defaultVariableName = ''),
        (this.dynamicImporters = []),
        (this.importers = []),
        (this.mostCommonSuggestion = 0),
        (this.namespaceVariableName = ''),
        (this.reexported = !1),
        (this.renderPath = void 0),
        (this.renormalizeRenderPath = !1),
        (this.used = !1),
        (this.variableName = ''),
        (this.id = t),
        (this.execIndex = 1 / 0),
        (this.moduleSideEffects = s)
      const n = t.split(/[\\/]/)
      ;(this.suggestedVariableName = we(n.pop())),
        (this.nameSuggestions = Object.create(null)),
        (this.declarations = Object.create(null)),
        (this.exportedVariables = new Map())
    }
    getVariableForExportName(e) {
      let t = this.declarations[e]
      return (
        t || ((this.declarations[e] = t = new be(this, e)), this.exportedVariables.set(t, e), t)
      )
    }
    setRenderPath(e, t) {
      return (
        (this.renderPath = 'function' == typeof e.paths ? e.paths(this.id) : e.paths[this.id]),
        this.renderPath ||
          (Ne(this.id)
            ? ((this.renderPath = Le(Oe(t, this.id))), (this.renormalizeRenderPath = !0))
            : (this.renderPath = this.id)),
        this.renderPath
      )
    }
    suggestName(e) {
      this.nameSuggestions[e] || (this.nameSuggestions[e] = 0),
        (this.nameSuggestions[e] += 1),
        this.nameSuggestions[e] > this.mostCommonSuggestion &&
          ((this.mostCommonSuggestion = this.nameSuggestions[e]), (this.suggestedVariableName = e))
    }
    warnUnusedImports() {
      const e = Object.keys(this.declarations).filter((e) => {
        if ('*' === e) return !1
        const t = this.declarations[e]
        return !t.included && !this.reexported && !t.referenced
      })
      if (0 === e.length) return
      const t =
        1 === e.length
          ? `'${e[0]}' is`
          : `${e
              .slice(0, -1)
              .map((e) => `'${e}'`)
              .join(', ')} and '${e.slice(-1)}' are`
      this.options.onwarn({
        code: 'UNUSED_EXTERNAL_IMPORT',
        message: `${t} imported from external module '${this.id}' but never used`,
        names: e,
        source: this.id
      })
    }
  }
  function Be(e) {
    e.isExecuted = !0
    const t = [e],
      s = new Set()
    for (const e of t)
      for (const i of [...e.dependencies, ...e.implicitlyLoadedBefore])
        i instanceof De ||
          i.isExecuted ||
          (!i.moduleSideEffects && !e.implicitlyLoadedBefore.has(i)) ||
          s.has(i.id) ||
          ((i.isExecuted = !0), s.add(i.id), t.push(i))
  }
  function Fe() {
    return { brokenFlow: 0, includedCallArguments: new Set(), includedLabels: new Set() }
  }
  function We() {
    return {
      accessed: new U(),
      assigned: new U(),
      brokenFlow: 0,
      called: new z(),
      ignore: { breaks: !1, continues: !1, labels: new Set(), returnAwaitYield: !1 },
      includedLabels: new Set(),
      instantiated: new z(),
      replacedVariableInits: new Map()
    }
  }
  class Ue extends Ee {
    constructor(e, t, s, i) {
      super(e),
        (this.additionalInitializers = null),
        (this.calledFromTryStatement = !1),
        (this.expressionsToBeDeoptimized = []),
        (this.declarations = t ? [t] : []),
        (this.init = s),
        (this.deoptimizationTracker = i.deoptimizationTracker),
        (this.module = i.module)
    }
    addDeclaration(e, t) {
      this.declarations.push(e),
        null === this.additionalInitializers &&
          ((this.additionalInitializers = null === this.init ? [] : [this.init]),
          (this.init = q),
          (this.isReassigned = !0)),
        null !== t && this.additionalInitializers.push(t)
    }
    consolidateInitializers() {
      if (null !== this.additionalInitializers) {
        for (const e of this.additionalInitializers) e.deoptimizePath(F)
        this.additionalInitializers = null
      }
    }
    deoptimizePath(e) {
      if (e.length > 7 || this.isReassigned) return
      const t = this.deoptimizationTracker.getEntities(e)
      if (!t.has(this))
        if ((t.add(this), 0 === e.length)) {
          if (!this.isReassigned) {
            this.isReassigned = !0
            const e = this.expressionsToBeDeoptimized
            this.expressionsToBeDeoptimized = []
            for (const t of e) t.deoptimizeCache()
            this.init && this.init.deoptimizePath(F)
          }
        } else this.init && this.init.deoptimizePath(e)
    }
    getLiteralValueAtPath(e, t, s) {
      if (this.isReassigned || !this.init || e.length > 7) return H
      const i = t.getEntities(e)
      if (i.has(this.init)) return H
      this.expressionsToBeDeoptimized.push(s), i.add(this.init)
      const n = this.init.getLiteralValueAtPath(e, t, s)
      return i.delete(this.init), n
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      if (this.isReassigned || !this.init || e.length > 7) return q
      const i = t.getEntities(e)
      if (i.has(this.init)) return q
      this.expressionsToBeDeoptimized.push(s), i.add(this.init)
      const n = this.init.getReturnExpressionWhenCalledAtPath(e, t, s)
      return i.delete(this.init), n
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      if (0 === e.length) return !1
      if (this.isReassigned || e.length > 7) return !0
      const s = t.accessed.getEntities(e)
      return (
        !s.has(this) && (s.add(this), this.init && this.init.hasEffectsWhenAccessedAtPath(e, t))
      )
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      if (this.included || e.length > 7) return !0
      if (0 === e.length) return !1
      if (this.isReassigned) return !0
      const s = t.assigned.getEntities(e)
      return (
        !s.has(this) && (s.add(this), this.init && this.init.hasEffectsWhenAssignedAtPath(e, t))
      )
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      if (e.length > 7 || this.isReassigned) return !0
      const i = (t.withNew ? s.instantiated : s.called).getEntities(e, t)
      return (
        !i.has(this) && (i.add(this), this.init && this.init.hasEffectsWhenCalledAtPath(e, t, s))
      )
    }
    include() {
      if (!this.included) {
        ;(this.included = !0), this.module.isExecuted || Be(this.module)
        for (const e of this.declarations) {
          e.included || e.include(Fe(), !1)
          let t = e.parent
          for (; !t.included && ((t.included = !0), 'Program' !== t.type); ) t = t.parent
        }
      }
    }
    includeCallArguments(e, t) {
      if (this.isReassigned || (this.init && e.includedCallArguments.has(this.init)))
        for (const s of t) s.include(e, !1)
      else
        this.init &&
          (e.includedCallArguments.add(this.init),
          this.init.includeCallArguments(e, t),
          e.includedCallArguments.delete(this.init))
    }
    markCalledFromTryStatement() {
      this.calledFromTryStatement = !0
    }
  }
  class je {
    constructor() {
      ;(this.children = []), (this.variables = new Map())
    }
    addDeclaration(e, t, s, i) {
      const n = e.name
      let r = this.variables.get(n)
      return (
        r ? r.addDeclaration(e, s) : ((r = new Ue(e.name, e, s || K, t)), this.variables.set(n, r)),
        r
      )
    }
    contains(e) {
      return this.variables.has(e)
    }
    findVariable(e) {
      throw new Error('Internal Error: findVariable needs to be implemented by a subclass')
    }
  }
  class ze extends je {
    constructor(e) {
      super(), (this.accessedOutsideVariables = new Map()), (this.parent = e), e.children.push(this)
    }
    addAccessedDynamicImport(e) {
      ;(this.accessedDynamicImports || (this.accessedDynamicImports = new Set())).add(e),
        this.parent instanceof ze && this.parent.addAccessedDynamicImport(e)
    }
    addAccessedGlobals(e, t) {
      const s = t.get(this) || new Set()
      for (const t of e) s.add(t)
      t.set(this, s), this.parent instanceof ze && this.parent.addAccessedGlobals(e, t)
    }
    addNamespaceMemberAccess(e, t) {
      this.accessedOutsideVariables.set(e, t), this.parent.addNamespaceMemberAccess(e, t)
    }
    addReturnExpression(e) {
      this.parent instanceof ze && this.parent.addReturnExpression(e)
    }
    addUsedOutsideNames(e, t, s, i) {
      for (const i of this.accessedOutsideVariables.values())
        i.included &&
          (e.add(i.getBaseVariableName()), 'system' === t && s.has(i) && e.add('exports'))
      const n = i.get(this)
      if (n) for (const t of n) e.add(t)
    }
    contains(e) {
      return this.variables.has(e) || this.parent.contains(e)
    }
    deconflict(e, t, s) {
      const i = new Set()
      if ((this.addUsedOutsideNames(i, e, t, s), this.accessedDynamicImports))
        for (const e of this.accessedDynamicImports)
          e.inlineNamespace && i.add(e.inlineNamespace.getBaseVariableName())
      for (const [e, t] of this.variables)
        (t.included || t.alwaysRendered) && t.setRenderNames(null, $(e, i))
      for (const i of this.children) i.deconflict(e, t, s)
    }
    findLexicalBoundary() {
      return this.parent.findLexicalBoundary()
    }
    findVariable(e) {
      const t = this.variables.get(e) || this.accessedOutsideVariables.get(e)
      if (t) return t
      const s = this.parent.findVariable(e)
      return this.accessedOutsideVariables.set(e, s), s
    }
  }
  function Ge(e, t, s) {
    if ('number' == typeof s)
      throw new Error(
        'locate takes a { startIndex, offsetLine, offsetColumn } object as the third argument'
      )
    return (function (e, t) {
      void 0 === t && (t = {})
      var s = t.offsetLine || 0,
        i = t.offsetColumn || 0,
        n = e.split('\n'),
        r = 0,
        a = n.map(function (e, t) {
          var s = r + e.length + 1,
            i = { start: r, end: s, line: t }
          return (r = s), i
        }),
        o = 0
      function h(e, t) {
        return e.start <= t && t < e.end
      }
      function l(e, t) {
        return { line: s + e.line, column: i + t - e.start, character: t }
      }
      return function (t, s) {
        'string' == typeof t && (t = e.indexOf(t, s || 0))
        for (var i = a[o], n = t >= i.end ? 1 : -1; i; ) {
          if (h(i, t)) return l(i, t)
          i = a[(o += n)]
        }
      }
    })(e, s)(t, s && s.startIndex)
  }
  const He = { Literal: [], Program: ['body'] }
  class qe {
    constructor(e, t, s) {
      ;(this.included = !1),
        (this.keys =
          He[e.type] ||
          (function (e) {
            return (He[e.type] = Object.keys(e).filter((t) => 'object' == typeof e[t])), He[e.type]
          })(e)),
        (this.parent = t),
        (this.context = t.context),
        this.createScope(s),
        this.parseNode(e),
        this.initialise(),
        this.context.magicString.addSourcemapLocation(this.start),
        this.context.magicString.addSourcemapLocation(this.end)
    }
    bind() {
      for (const e of this.keys) {
        const t = this[e]
        if (null !== t && 'annotations' !== e)
          if (Array.isArray(t)) for (const e of t) null !== e && e.bind()
          else t.bind()
      }
    }
    createScope(e) {
      this.scope = e
    }
    declare(e, t) {
      return []
    }
    deoptimizePath(e) {}
    getLiteralValueAtPath(e, t, s) {
      return H
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      return q
    }
    hasEffects(e) {
      for (const t of this.keys) {
        const s = this[t]
        if (null !== s && 'annotations' !== t)
          if (Array.isArray(s)) {
            for (const t of s) if (null !== t && t.hasEffects(e)) return !0
          } else if (s.hasEffects(e)) return !0
      }
      return !1
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      return e.length > 0
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return !0
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return !0
    }
    include(e, t) {
      this.included = !0
      for (const s of this.keys) {
        const i = this[s]
        if (null !== i && 'annotations' !== s)
          if (Array.isArray(i)) for (const s of i) null !== s && s.include(e, t)
          else i.include(e, t)
      }
    }
    includeCallArguments(e, t) {
      for (const s of t) s.include(e, !1)
    }
    includeWithAllDeclaredVariables(e, t) {
      this.include(t, e)
    }
    initialise() {}
    insertSemicolon(e) {
      ';' !== e.original[this.end - 1] && e.appendLeft(this.end, ';')
    }
    parseNode(e) {
      for (const t of Object.keys(e)) {
        if (this.hasOwnProperty(t)) continue
        const s = e[t]
        if ('object' != typeof s || null === s || 'annotations' === t) this[t] = s
        else if (Array.isArray(s)) {
          this[t] = []
          for (const e of s)
            this[t].push(
              null === e
                ? null
                : new (this.context.nodeConstructors[e.type] ||
                    this.context.nodeConstructors.UnknownNode)(e, this, this.scope)
            )
        } else
          this[t] = new (this.context.nodeConstructors[s.type] ||
            this.context.nodeConstructors.UnknownNode)(s, this, this.scope)
      }
    }
    render(e, t) {
      for (const s of this.keys) {
        const i = this[s]
        if (null !== i && 'annotations' !== s)
          if (Array.isArray(i)) for (const s of i) null !== s && s.render(e, t)
          else i.render(e, t)
      }
    }
    shouldBeIncluded(e) {
      return this.included || (!e.brokenFlow && this.hasEffects(We()))
    }
    toString() {
      return this.context.code.slice(this.start, this.end)
    }
  }
  class Ke extends qe {
    createScope(e) {
      this.scope = new ze(e)
    }
    hasEffectsWhenAccessedAtPath(e) {
      return !(e.length <= 1) && (e.length > 2 || 'prototype' !== e[0])
    }
    hasEffectsWhenAssignedAtPath(e) {
      return !(e.length <= 1) && (e.length > 2 || 'prototype' !== e[0])
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return (
        !t.withNew ||
        this.body.hasEffectsWhenCalledAtPath(e, t, s) ||
        (null !== this.superClass && this.superClass.hasEffectsWhenCalledAtPath(e, t, s))
      )
    }
    initialise() {
      null !== this.id && this.id.declare('class', this)
    }
  }
  class Xe extends Ke {
    initialise() {
      super.initialise(), null !== this.id && (this.id.variable.isId = !0)
    }
    parseNode(e) {
      null !== e.id &&
        (this.id = new this.context.nodeConstructors.Identifier(e.id, this, this.scope.parent)),
        super.parseNode(e)
    }
    render(e, t) {
      'system' === t.format &&
        this.id &&
        t.exportNamesByVariable.has(this.id.variable) &&
        e.appendLeft(this.end, `${t.compact ? '' : ' '}${T([this.id.variable], t)};`),
        super.render(e, t)
    }
  }
  class Ye extends Ue {
    constructor(e) {
      super('arguments', null, q, e)
    }
    hasEffectsWhenAccessedAtPath(e) {
      return e.length > 1
    }
    hasEffectsWhenAssignedAtPath() {
      return !0
    }
    hasEffectsWhenCalledAtPath() {
      return !0
    }
  }
  class Qe extends Ue {
    constructor(e) {
      super('this', null, null, e)
    }
    getLiteralValueAtPath() {
      return H
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      return (
        this.getInit(t).hasEffectsWhenAccessedAtPath(e, t) ||
        super.hasEffectsWhenAccessedAtPath(e, t)
      )
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return (
        this.getInit(t).hasEffectsWhenAssignedAtPath(e, t) ||
        super.hasEffectsWhenAssignedAtPath(e, t)
      )
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return (
        this.getInit(s).hasEffectsWhenCalledAtPath(e, t, s) ||
        super.hasEffectsWhenCalledAtPath(e, t, s)
      )
    }
    getInit(e) {
      return e.replacedVariableInits.get(this) || q
    }
  }
  class Je extends qe {
    bind() {
      super.bind(), this.argument.deoptimizePath([D, D])
    }
  }
  class Ze extends ze {
    constructor(e, t) {
      super(e),
        (this.parameters = []),
        (this.hasRest = !1),
        (this.context = t),
        (this.hoistedBodyVarScope = new ze(this))
    }
    addParameterDeclaration(e) {
      const t = e.name
      let s = this.hoistedBodyVarScope.variables.get(t)
      return (
        s ? s.addDeclaration(e, null) : (s = new Ue(t, e, q, this.context)),
        this.variables.set(t, s),
        s
      )
    }
    addParameterVariables(e, t) {
      this.parameters = e
      for (const t of e) for (const e of t) e.alwaysRendered = !0
      this.hasRest = t
    }
    includeCallArguments(e, t) {
      let s = !1,
        i = !1
      const n = this.hasRest && this.parameters[this.parameters.length - 1]
      for (const s of t)
        if (s instanceof Je) {
          for (const s of t) s.include(e, !1)
          break
        }
      for (let r = t.length - 1; r >= 0; r--) {
        const a = this.parameters[r] || n,
          o = t[r]
        if (a) {
          s = !1
          for (const e of a) e.included && (i = !0), e.calledFromTryStatement && (s = !0)
        }
        !i && o.shouldBeIncluded(e) && (i = !0), i && o.include(e, s)
      }
    }
  }
  class et extends Ze {
    constructor() {
      super(...arguments), (this.returnExpression = null), (this.returnExpressions = [])
    }
    addReturnExpression(e) {
      this.returnExpressions.push(e)
    }
    getReturnExpression() {
      return null === this.returnExpression && this.updateReturnExpression(), this.returnExpression
    }
    updateReturnExpression() {
      if (1 === this.returnExpressions.length) this.returnExpression = this.returnExpressions[0]
      else {
        this.returnExpression = q
        for (const e of this.returnExpressions) e.deoptimizePath(F)
      }
    }
  }
  class tt extends et {
    constructor(e, t) {
      super(e, t),
        this.variables.set('arguments', (this.argumentsVariable = new Ye(t))),
        this.variables.set('this', (this.thisVariable = new Qe(t)))
    }
    findLexicalBoundary() {
      return this
    }
    includeCallArguments(e, t) {
      if ((super.includeCallArguments(e, t), this.argumentsVariable.included))
        for (const s of t) s.included || s.include(e, !1)
    }
  }
  const st = Object.freeze(Object.create(null)),
    it = Object.freeze({}),
    nt = Object.freeze([]),
    rt = Symbol('Value Properties'),
    at = { pure: !0 },
    ot = { pure: !1 },
    ht = { __proto__: null, [rt]: ot },
    lt = { __proto__: null, [rt]: at },
    ct = { __proto__: null, [rt]: ot, prototype: ht },
    ut = { __proto__: null, [rt]: at, prototype: ht },
    pt = { __proto__: null, [rt]: at, from: lt, of: lt, prototype: ht },
    dt = { __proto__: null, [rt]: at, supportedLocalesOf: ut },
    ft = {
      global: ht,
      globalThis: ht,
      self: ht,
      window: ht,
      __proto__: null,
      [rt]: ot,
      Array: { __proto__: null, [rt]: ot, from: ht, isArray: lt, of: lt, prototype: ht },
      ArrayBuffer: { __proto__: null, [rt]: at, isView: lt, prototype: ht },
      Atomics: ht,
      BigInt: ct,
      BigInt64Array: ct,
      BigUint64Array: ct,
      Boolean: ut,
      constructor: ct,
      DataView: ut,
      Date: { __proto__: null, [rt]: at, now: lt, parse: lt, prototype: ht, UTC: lt },
      decodeURI: lt,
      decodeURIComponent: lt,
      encodeURI: lt,
      encodeURIComponent: lt,
      Error: ut,
      escape: lt,
      eval: ht,
      EvalError: ut,
      Float32Array: pt,
      Float64Array: pt,
      Function: ct,
      hasOwnProperty: ht,
      Infinity: ht,
      Int16Array: pt,
      Int32Array: pt,
      Int8Array: pt,
      isFinite: lt,
      isNaN: lt,
      isPrototypeOf: ht,
      JSON: ht,
      Map: ut,
      Math: {
        __proto__: null,
        [rt]: ot,
        abs: lt,
        acos: lt,
        acosh: lt,
        asin: lt,
        asinh: lt,
        atan: lt,
        atan2: lt,
        atanh: lt,
        cbrt: lt,
        ceil: lt,
        clz32: lt,
        cos: lt,
        cosh: lt,
        exp: lt,
        expm1: lt,
        floor: lt,
        fround: lt,
        hypot: lt,
        imul: lt,
        log: lt,
        log10: lt,
        log1p: lt,
        log2: lt,
        max: lt,
        min: lt,
        pow: lt,
        random: lt,
        round: lt,
        sign: lt,
        sin: lt,
        sinh: lt,
        sqrt: lt,
        tan: lt,
        tanh: lt,
        trunc: lt
      },
      NaN: ht,
      Number: {
        __proto__: null,
        [rt]: at,
        isFinite: lt,
        isInteger: lt,
        isNaN: lt,
        isSafeInteger: lt,
        parseFloat: lt,
        parseInt: lt,
        prototype: ht
      },
      Object: {
        __proto__: null,
        [rt]: at,
        create: lt,
        getNotifier: lt,
        getOwn: lt,
        getOwnPropertyDescriptor: lt,
        getOwnPropertyNames: lt,
        getOwnPropertySymbols: lt,
        getPrototypeOf: lt,
        is: lt,
        isExtensible: lt,
        isFrozen: lt,
        isSealed: lt,
        keys: lt,
        prototype: ht
      },
      parseFloat: lt,
      parseInt: lt,
      Promise: { __proto__: null, [rt]: ot, all: lt, prototype: ht, race: lt, resolve: lt },
      propertyIsEnumerable: ht,
      Proxy: ht,
      RangeError: ut,
      ReferenceError: ut,
      Reflect: ht,
      RegExp: ut,
      Set: ut,
      SharedArrayBuffer: ct,
      String: {
        __proto__: null,
        [rt]: at,
        fromCharCode: lt,
        fromCodePoint: lt,
        prototype: ht,
        raw: lt
      },
      Symbol: { __proto__: null, [rt]: at, for: lt, keyFor: lt, prototype: ht },
      SyntaxError: ut,
      toLocaleString: ht,
      toString: ht,
      TypeError: ut,
      Uint16Array: pt,
      Uint32Array: pt,
      Uint8Array: pt,
      Uint8ClampedArray: pt,
      unescape: lt,
      URIError: ut,
      valueOf: ht,
      WeakMap: ut,
      WeakSet: ut,
      clearInterval: ct,
      clearTimeout: ct,
      console: ht,
      Intl: {
        __proto__: null,
        [rt]: ot,
        Collator: dt,
        DateTimeFormat: dt,
        ListFormat: dt,
        NumberFormat: dt,
        PluralRules: dt,
        RelativeTimeFormat: dt
      },
      setInterval: ct,
      setTimeout: ct,
      TextDecoder: ct,
      TextEncoder: ct,
      URL: ct,
      URLSearchParams: ct,
      AbortController: ct,
      AbortSignal: ct,
      addEventListener: ht,
      alert: ht,
      AnalyserNode: ct,
      Animation: ct,
      AnimationEvent: ct,
      applicationCache: ht,
      ApplicationCache: ct,
      ApplicationCacheErrorEvent: ct,
      atob: ht,
      Attr: ct,
      Audio: ct,
      AudioBuffer: ct,
      AudioBufferSourceNode: ct,
      AudioContext: ct,
      AudioDestinationNode: ct,
      AudioListener: ct,
      AudioNode: ct,
      AudioParam: ct,
      AudioProcessingEvent: ct,
      AudioScheduledSourceNode: ct,
      AudioWorkletNode: ct,
      BarProp: ct,
      BaseAudioContext: ct,
      BatteryManager: ct,
      BeforeUnloadEvent: ct,
      BiquadFilterNode: ct,
      Blob: ct,
      BlobEvent: ct,
      blur: ht,
      BroadcastChannel: ct,
      btoa: ht,
      ByteLengthQueuingStrategy: ct,
      Cache: ct,
      caches: ht,
      CacheStorage: ct,
      cancelAnimationFrame: ht,
      cancelIdleCallback: ht,
      CanvasCaptureMediaStreamTrack: ct,
      CanvasGradient: ct,
      CanvasPattern: ct,
      CanvasRenderingContext2D: ct,
      ChannelMergerNode: ct,
      ChannelSplitterNode: ct,
      CharacterData: ct,
      clientInformation: ht,
      ClipboardEvent: ct,
      close: ht,
      closed: ht,
      CloseEvent: ct,
      Comment: ct,
      CompositionEvent: ct,
      confirm: ht,
      ConstantSourceNode: ct,
      ConvolverNode: ct,
      CountQueuingStrategy: ct,
      createImageBitmap: ht,
      Credential: ct,
      CredentialsContainer: ct,
      crypto: ht,
      Crypto: ct,
      CryptoKey: ct,
      CSS: ct,
      CSSConditionRule: ct,
      CSSFontFaceRule: ct,
      CSSGroupingRule: ct,
      CSSImportRule: ct,
      CSSKeyframeRule: ct,
      CSSKeyframesRule: ct,
      CSSMediaRule: ct,
      CSSNamespaceRule: ct,
      CSSPageRule: ct,
      CSSRule: ct,
      CSSRuleList: ct,
      CSSStyleDeclaration: ct,
      CSSStyleRule: ct,
      CSSStyleSheet: ct,
      CSSSupportsRule: ct,
      CustomElementRegistry: ct,
      customElements: ht,
      CustomEvent: ct,
      DataTransfer: ct,
      DataTransferItem: ct,
      DataTransferItemList: ct,
      defaultstatus: ht,
      defaultStatus: ht,
      DelayNode: ct,
      DeviceMotionEvent: ct,
      DeviceOrientationEvent: ct,
      devicePixelRatio: ht,
      dispatchEvent: ht,
      document: ht,
      Document: ct,
      DocumentFragment: ct,
      DocumentType: ct,
      DOMError: ct,
      DOMException: ct,
      DOMImplementation: ct,
      DOMMatrix: ct,
      DOMMatrixReadOnly: ct,
      DOMParser: ct,
      DOMPoint: ct,
      DOMPointReadOnly: ct,
      DOMQuad: ct,
      DOMRect: ct,
      DOMRectReadOnly: ct,
      DOMStringList: ct,
      DOMStringMap: ct,
      DOMTokenList: ct,
      DragEvent: ct,
      DynamicsCompressorNode: ct,
      Element: ct,
      ErrorEvent: ct,
      Event: ct,
      EventSource: ct,
      EventTarget: ct,
      external: ht,
      fetch: ht,
      File: ct,
      FileList: ct,
      FileReader: ct,
      find: ht,
      focus: ht,
      FocusEvent: ct,
      FontFace: ct,
      FontFaceSetLoadEvent: ct,
      FormData: ct,
      frames: ht,
      GainNode: ct,
      Gamepad: ct,
      GamepadButton: ct,
      GamepadEvent: ct,
      getComputedStyle: ht,
      getSelection: ht,
      HashChangeEvent: ct,
      Headers: ct,
      history: ht,
      History: ct,
      HTMLAllCollection: ct,
      HTMLAnchorElement: ct,
      HTMLAreaElement: ct,
      HTMLAudioElement: ct,
      HTMLBaseElement: ct,
      HTMLBodyElement: ct,
      HTMLBRElement: ct,
      HTMLButtonElement: ct,
      HTMLCanvasElement: ct,
      HTMLCollection: ct,
      HTMLContentElement: ct,
      HTMLDataElement: ct,
      HTMLDataListElement: ct,
      HTMLDetailsElement: ct,
      HTMLDialogElement: ct,
      HTMLDirectoryElement: ct,
      HTMLDivElement: ct,
      HTMLDListElement: ct,
      HTMLDocument: ct,
      HTMLElement: ct,
      HTMLEmbedElement: ct,
      HTMLFieldSetElement: ct,
      HTMLFontElement: ct,
      HTMLFormControlsCollection: ct,
      HTMLFormElement: ct,
      HTMLFrameElement: ct,
      HTMLFrameSetElement: ct,
      HTMLHeadElement: ct,
      HTMLHeadingElement: ct,
      HTMLHRElement: ct,
      HTMLHtmlElement: ct,
      HTMLIFrameElement: ct,
      HTMLImageElement: ct,
      HTMLInputElement: ct,
      HTMLLabelElement: ct,
      HTMLLegendElement: ct,
      HTMLLIElement: ct,
      HTMLLinkElement: ct,
      HTMLMapElement: ct,
      HTMLMarqueeElement: ct,
      HTMLMediaElement: ct,
      HTMLMenuElement: ct,
      HTMLMetaElement: ct,
      HTMLMeterElement: ct,
      HTMLModElement: ct,
      HTMLObjectElement: ct,
      HTMLOListElement: ct,
      HTMLOptGroupElement: ct,
      HTMLOptionElement: ct,
      HTMLOptionsCollection: ct,
      HTMLOutputElement: ct,
      HTMLParagraphElement: ct,
      HTMLParamElement: ct,
      HTMLPictureElement: ct,
      HTMLPreElement: ct,
      HTMLProgressElement: ct,
      HTMLQuoteElement: ct,
      HTMLScriptElement: ct,
      HTMLSelectElement: ct,
      HTMLShadowElement: ct,
      HTMLSlotElement: ct,
      HTMLSourceElement: ct,
      HTMLSpanElement: ct,
      HTMLStyleElement: ct,
      HTMLTableCaptionElement: ct,
      HTMLTableCellElement: ct,
      HTMLTableColElement: ct,
      HTMLTableElement: ct,
      HTMLTableRowElement: ct,
      HTMLTableSectionElement: ct,
      HTMLTemplateElement: ct,
      HTMLTextAreaElement: ct,
      HTMLTimeElement: ct,
      HTMLTitleElement: ct,
      HTMLTrackElement: ct,
      HTMLUListElement: ct,
      HTMLUnknownElement: ct,
      HTMLVideoElement: ct,
      IDBCursor: ct,
      IDBCursorWithValue: ct,
      IDBDatabase: ct,
      IDBFactory: ct,
      IDBIndex: ct,
      IDBKeyRange: ct,
      IDBObjectStore: ct,
      IDBOpenDBRequest: ct,
      IDBRequest: ct,
      IDBTransaction: ct,
      IDBVersionChangeEvent: ct,
      IdleDeadline: ct,
      IIRFilterNode: ct,
      Image: ct,
      ImageBitmap: ct,
      ImageBitmapRenderingContext: ct,
      ImageCapture: ct,
      ImageData: ct,
      indexedDB: ht,
      innerHeight: ht,
      innerWidth: ht,
      InputEvent: ct,
      IntersectionObserver: ct,
      IntersectionObserverEntry: ct,
      isSecureContext: ht,
      KeyboardEvent: ct,
      KeyframeEffect: ct,
      length: ht,
      localStorage: ht,
      location: ht,
      Location: ct,
      locationbar: ht,
      matchMedia: ht,
      MediaDeviceInfo: ct,
      MediaDevices: ct,
      MediaElementAudioSourceNode: ct,
      MediaEncryptedEvent: ct,
      MediaError: ct,
      MediaKeyMessageEvent: ct,
      MediaKeySession: ct,
      MediaKeyStatusMap: ct,
      MediaKeySystemAccess: ct,
      MediaList: ct,
      MediaQueryList: ct,
      MediaQueryListEvent: ct,
      MediaRecorder: ct,
      MediaSettingsRange: ct,
      MediaSource: ct,
      MediaStream: ct,
      MediaStreamAudioDestinationNode: ct,
      MediaStreamAudioSourceNode: ct,
      MediaStreamEvent: ct,
      MediaStreamTrack: ct,
      MediaStreamTrackEvent: ct,
      menubar: ht,
      MessageChannel: ct,
      MessageEvent: ct,
      MessagePort: ct,
      MIDIAccess: ct,
      MIDIConnectionEvent: ct,
      MIDIInput: ct,
      MIDIInputMap: ct,
      MIDIMessageEvent: ct,
      MIDIOutput: ct,
      MIDIOutputMap: ct,
      MIDIPort: ct,
      MimeType: ct,
      MimeTypeArray: ct,
      MouseEvent: ct,
      moveBy: ht,
      moveTo: ht,
      MutationEvent: ct,
      MutationObserver: ct,
      MutationRecord: ct,
      name: ht,
      NamedNodeMap: ct,
      NavigationPreloadManager: ct,
      navigator: ht,
      Navigator: ct,
      NetworkInformation: ct,
      Node: ct,
      NodeFilter: ht,
      NodeIterator: ct,
      NodeList: ct,
      Notification: ct,
      OfflineAudioCompletionEvent: ct,
      OfflineAudioContext: ct,
      offscreenBuffering: ht,
      OffscreenCanvas: ct,
      open: ht,
      openDatabase: ht,
      Option: ct,
      origin: ht,
      OscillatorNode: ct,
      outerHeight: ht,
      outerWidth: ht,
      PageTransitionEvent: ct,
      pageXOffset: ht,
      pageYOffset: ht,
      PannerNode: ct,
      parent: ht,
      Path2D: ct,
      PaymentAddress: ct,
      PaymentRequest: ct,
      PaymentRequestUpdateEvent: ct,
      PaymentResponse: ct,
      performance: ht,
      Performance: ct,
      PerformanceEntry: ct,
      PerformanceLongTaskTiming: ct,
      PerformanceMark: ct,
      PerformanceMeasure: ct,
      PerformanceNavigation: ct,
      PerformanceNavigationTiming: ct,
      PerformanceObserver: ct,
      PerformanceObserverEntryList: ct,
      PerformancePaintTiming: ct,
      PerformanceResourceTiming: ct,
      PerformanceTiming: ct,
      PeriodicWave: ct,
      Permissions: ct,
      PermissionStatus: ct,
      personalbar: ht,
      PhotoCapabilities: ct,
      Plugin: ct,
      PluginArray: ct,
      PointerEvent: ct,
      PopStateEvent: ct,
      postMessage: ht,
      Presentation: ct,
      PresentationAvailability: ct,
      PresentationConnection: ct,
      PresentationConnectionAvailableEvent: ct,
      PresentationConnectionCloseEvent: ct,
      PresentationConnectionList: ct,
      PresentationReceiver: ct,
      PresentationRequest: ct,
      print: ht,
      ProcessingInstruction: ct,
      ProgressEvent: ct,
      PromiseRejectionEvent: ct,
      prompt: ht,
      PushManager: ct,
      PushSubscription: ct,
      PushSubscriptionOptions: ct,
      queueMicrotask: ht,
      RadioNodeList: ct,
      Range: ct,
      ReadableStream: ct,
      RemotePlayback: ct,
      removeEventListener: ht,
      Request: ct,
      requestAnimationFrame: ht,
      requestIdleCallback: ht,
      resizeBy: ht,
      ResizeObserver: ct,
      ResizeObserverEntry: ct,
      resizeTo: ht,
      Response: ct,
      RTCCertificate: ct,
      RTCDataChannel: ct,
      RTCDataChannelEvent: ct,
      RTCDtlsTransport: ct,
      RTCIceCandidate: ct,
      RTCIceTransport: ct,
      RTCPeerConnection: ct,
      RTCPeerConnectionIceEvent: ct,
      RTCRtpReceiver: ct,
      RTCRtpSender: ct,
      RTCSctpTransport: ct,
      RTCSessionDescription: ct,
      RTCStatsReport: ct,
      RTCTrackEvent: ct,
      screen: ht,
      Screen: ct,
      screenLeft: ht,
      ScreenOrientation: ct,
      screenTop: ht,
      screenX: ht,
      screenY: ht,
      ScriptProcessorNode: ct,
      scroll: ht,
      scrollbars: ht,
      scrollBy: ht,
      scrollTo: ht,
      scrollX: ht,
      scrollY: ht,
      SecurityPolicyViolationEvent: ct,
      Selection: ct,
      ServiceWorker: ct,
      ServiceWorkerContainer: ct,
      ServiceWorkerRegistration: ct,
      sessionStorage: ht,
      ShadowRoot: ct,
      SharedWorker: ct,
      SourceBuffer: ct,
      SourceBufferList: ct,
      speechSynthesis: ht,
      SpeechSynthesisEvent: ct,
      SpeechSynthesisUtterance: ct,
      StaticRange: ct,
      status: ht,
      statusbar: ht,
      StereoPannerNode: ct,
      stop: ht,
      Storage: ct,
      StorageEvent: ct,
      StorageManager: ct,
      styleMedia: ht,
      StyleSheet: ct,
      StyleSheetList: ct,
      SubtleCrypto: ct,
      SVGAElement: ct,
      SVGAngle: ct,
      SVGAnimatedAngle: ct,
      SVGAnimatedBoolean: ct,
      SVGAnimatedEnumeration: ct,
      SVGAnimatedInteger: ct,
      SVGAnimatedLength: ct,
      SVGAnimatedLengthList: ct,
      SVGAnimatedNumber: ct,
      SVGAnimatedNumberList: ct,
      SVGAnimatedPreserveAspectRatio: ct,
      SVGAnimatedRect: ct,
      SVGAnimatedString: ct,
      SVGAnimatedTransformList: ct,
      SVGAnimateElement: ct,
      SVGAnimateMotionElement: ct,
      SVGAnimateTransformElement: ct,
      SVGAnimationElement: ct,
      SVGCircleElement: ct,
      SVGClipPathElement: ct,
      SVGComponentTransferFunctionElement: ct,
      SVGDefsElement: ct,
      SVGDescElement: ct,
      SVGDiscardElement: ct,
      SVGElement: ct,
      SVGEllipseElement: ct,
      SVGFEBlendElement: ct,
      SVGFEColorMatrixElement: ct,
      SVGFEComponentTransferElement: ct,
      SVGFECompositeElement: ct,
      SVGFEConvolveMatrixElement: ct,
      SVGFEDiffuseLightingElement: ct,
      SVGFEDisplacementMapElement: ct,
      SVGFEDistantLightElement: ct,
      SVGFEDropShadowElement: ct,
      SVGFEFloodElement: ct,
      SVGFEFuncAElement: ct,
      SVGFEFuncBElement: ct,
      SVGFEFuncGElement: ct,
      SVGFEFuncRElement: ct,
      SVGFEGaussianBlurElement: ct,
      SVGFEImageElement: ct,
      SVGFEMergeElement: ct,
      SVGFEMergeNodeElement: ct,
      SVGFEMorphologyElement: ct,
      SVGFEOffsetElement: ct,
      SVGFEPointLightElement: ct,
      SVGFESpecularLightingElement: ct,
      SVGFESpotLightElement: ct,
      SVGFETileElement: ct,
      SVGFETurbulenceElement: ct,
      SVGFilterElement: ct,
      SVGForeignObjectElement: ct,
      SVGGElement: ct,
      SVGGeometryElement: ct,
      SVGGradientElement: ct,
      SVGGraphicsElement: ct,
      SVGImageElement: ct,
      SVGLength: ct,
      SVGLengthList: ct,
      SVGLinearGradientElement: ct,
      SVGLineElement: ct,
      SVGMarkerElement: ct,
      SVGMaskElement: ct,
      SVGMatrix: ct,
      SVGMetadataElement: ct,
      SVGMPathElement: ct,
      SVGNumber: ct,
      SVGNumberList: ct,
      SVGPathElement: ct,
      SVGPatternElement: ct,
      SVGPoint: ct,
      SVGPointList: ct,
      SVGPolygonElement: ct,
      SVGPolylineElement: ct,
      SVGPreserveAspectRatio: ct,
      SVGRadialGradientElement: ct,
      SVGRect: ct,
      SVGRectElement: ct,
      SVGScriptElement: ct,
      SVGSetElement: ct,
      SVGStopElement: ct,
      SVGStringList: ct,
      SVGStyleElement: ct,
      SVGSVGElement: ct,
      SVGSwitchElement: ct,
      SVGSymbolElement: ct,
      SVGTextContentElement: ct,
      SVGTextElement: ct,
      SVGTextPathElement: ct,
      SVGTextPositioningElement: ct,
      SVGTitleElement: ct,
      SVGTransform: ct,
      SVGTransformList: ct,
      SVGTSpanElement: ct,
      SVGUnitTypes: ct,
      SVGUseElement: ct,
      SVGViewElement: ct,
      TaskAttributionTiming: ct,
      Text: ct,
      TextEvent: ct,
      TextMetrics: ct,
      TextTrack: ct,
      TextTrackCue: ct,
      TextTrackCueList: ct,
      TextTrackList: ct,
      TimeRanges: ct,
      toolbar: ht,
      top: ht,
      Touch: ct,
      TouchEvent: ct,
      TouchList: ct,
      TrackEvent: ct,
      TransitionEvent: ct,
      TreeWalker: ct,
      UIEvent: ct,
      ValidityState: ct,
      visualViewport: ht,
      VisualViewport: ct,
      VTTCue: ct,
      WaveShaperNode: ct,
      WebAssembly: ht,
      WebGL2RenderingContext: ct,
      WebGLActiveInfo: ct,
      WebGLBuffer: ct,
      WebGLContextEvent: ct,
      WebGLFramebuffer: ct,
      WebGLProgram: ct,
      WebGLQuery: ct,
      WebGLRenderbuffer: ct,
      WebGLRenderingContext: ct,
      WebGLSampler: ct,
      WebGLShader: ct,
      WebGLShaderPrecisionFormat: ct,
      WebGLSync: ct,
      WebGLTexture: ct,
      WebGLTransformFeedback: ct,
      WebGLUniformLocation: ct,
      WebGLVertexArrayObject: ct,
      WebSocket: ct,
      WheelEvent: ct,
      Window: ct,
      Worker: ct,
      WritableStream: ct,
      XMLDocument: ct,
      XMLHttpRequest: ct,
      XMLHttpRequestEventTarget: ct,
      XMLHttpRequestUpload: ct,
      XMLSerializer: ct,
      XPathEvaluator: ct,
      XPathExpression: ct,
      XPathResult: ct,
      XSLTProcessor: ct
    }
  for (const e of ['window', 'global', 'self', 'globalThis']) ft[e] = ft
  function mt(e) {
    let t = ft
    for (const s of e) {
      if ('string' != typeof s) return null
      if (((t = t[s]), !t)) return null
    }
    return t[rt]
  }
  class gt extends Ee {
    constructor() {
      super(...arguments), (this.isReassigned = !0)
    }
    hasEffectsWhenAccessedAtPath(e) {
      return !(function (e) {
        return 1 === e.length ? 'undefined' === e[0] || null !== mt(e) : null !== mt(e.slice(0, -1))
      })([this.name, ...e])
    }
    hasEffectsWhenCalledAtPath(e) {
      return !(function (e) {
        const t = mt(e)
        return null !== t && t.pure
      })([this.name, ...e])
    }
  }
  class yt extends qe {
    constructor() {
      super(...arguments), (this.variable = null), (this.bound = !1)
    }
    addExportedVariables(e, t) {
      null !== this.variable && t.has(this.variable) && e.push(this.variable)
    }
    bind() {
      this.bound ||
        ((this.bound = !0),
        null === this.variable &&
          (function e(t, s) {
            if ('MemberExpression' === t.type) return !t.computed && e(t.object, t)
            if ('Identifier' === t.type) {
              if (!s) return !0
              switch (s.type) {
                case 'MemberExpression':
                  return s.computed || t === s.object
                case 'MethodDefinition':
                  return s.computed
                case 'FieldDefinition':
                case 'Property':
                  return s.computed || t === s.value
                case 'ExportSpecifier':
                case 'ImportSpecifier':
                  return t === s.local
                case 'LabeledStatement':
                case 'BreakStatement':
                case 'ContinueStatement':
                  return !1
                default:
                  return !0
              }
            }
            return !1
          })(this, this.parent) &&
          ((this.variable = this.scope.findVariable(this.name)), this.variable.addReference(this)),
        null !== this.variable &&
          this.variable instanceof Ue &&
          null !== this.variable.additionalInitializers &&
          this.variable.consolidateInitializers())
    }
    declare(e, t) {
      let s
      switch (e) {
        case 'var':
          s = this.scope.addDeclaration(this, this.context, t, !0)
          break
        case 'function':
          s = this.scope.addDeclaration(this, this.context, t, !1)
          break
        case 'let':
        case 'const':
        case 'class':
          s = this.scope.addDeclaration(this, this.context, t, !1)
          break
        case 'parameter':
          s = this.scope.addParameterDeclaration(this)
          break
        default:
          throw new Error(`Internal Error: Unexpected identifier kind ${e}.`)
      }
      return [(this.variable = s)]
    }
    deoptimizePath(e) {
      this.bound || this.bind(),
        0 !== e.length || this.scope.contains(this.name) || this.disallowImportReassignment(),
        this.variable.deoptimizePath(e)
    }
    getLiteralValueAtPath(e, t, s) {
      return this.bound || this.bind(), this.variable.getLiteralValueAtPath(e, t, s)
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      return this.bound || this.bind(), this.variable.getReturnExpressionWhenCalledAtPath(e, t, s)
    }
    hasEffects() {
      return (
        this.context.options.treeshake.unknownGlobalSideEffects &&
        this.variable instanceof gt &&
        this.variable.hasEffectsWhenAccessedAtPath(B)
      )
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      return null !== this.variable && this.variable.hasEffectsWhenAccessedAtPath(e, t)
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return !this.variable || this.variable.hasEffectsWhenAssignedAtPath(e, t)
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return !this.variable || this.variable.hasEffectsWhenCalledAtPath(e, t, s)
    }
    include() {
      this.included ||
        ((this.included = !0),
        null !== this.variable && this.context.includeVariable(this.variable))
    }
    includeCallArguments(e, t) {
      this.variable.includeCallArguments(e, t)
    }
    render(
      e,
      t,
      { renderedParentType: s, isCalleeOfRenderedParent: i, isShorthandProperty: n } = st
    ) {
      if (this.variable) {
        const t = this.variable.getName()
        t !== this.name &&
          (e.overwrite(this.start, this.end, t, { contentOnly: !0, storeName: !0 }),
          n && e.prependRight(this.start, this.name + ': ')),
          'eval' === t && 'CallExpression' === s && i && e.appendRight(this.start, '0, ')
      }
    }
    disallowImportReassignment() {
      return this.context.error(
        { code: 'ILLEGAL_REASSIGNMENT', message: `Illegal reassignment to import '${this.name}'` },
        this.start
      )
    }
  }
  class xt extends qe {
    constructor() {
      super(...arguments), (this.declarationInit = null)
    }
    addExportedVariables(e, t) {
      this.argument.addExportedVariables(e, t)
    }
    bind() {
      super.bind(), null !== this.declarationInit && this.declarationInit.deoptimizePath([D, D])
    }
    declare(e, t) {
      return (this.declarationInit = t), this.argument.declare(e, q)
    }
    deoptimizePath(e) {
      0 === e.length && this.argument.deoptimizePath(B)
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return e.length > 0 || this.argument.hasEffectsWhenAssignedAtPath(B, t)
    }
  }
  class vt extends qe {
    constructor() {
      super(...arguments), (this.isPrototypeDeoptimized = !1)
    }
    createScope(e) {
      this.scope = new tt(e, this.context)
    }
    deoptimizePath(e) {
      1 === e.length &&
        ('prototype' === e[0]
          ? (this.isPrototypeDeoptimized = !0)
          : e[0] === D &&
            ((this.isPrototypeDeoptimized = !0),
            this.scope.getReturnExpression().deoptimizePath(F)))
    }
    getReturnExpressionWhenCalledAtPath(e) {
      return 0 === e.length ? this.scope.getReturnExpression() : q
    }
    hasEffects() {
      return null !== this.id && this.id.hasEffects()
    }
    hasEffectsWhenAccessedAtPath(e) {
      return (
        !(e.length <= 1) && (e.length > 2 || 'prototype' !== e[0] || this.isPrototypeDeoptimized)
      )
    }
    hasEffectsWhenAssignedAtPath(e) {
      return (
        !(e.length <= 1) && (e.length > 2 || 'prototype' !== e[0] || this.isPrototypeDeoptimized)
      )
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      if (e.length > 0) return !0
      for (const e of this.params) if (e.hasEffects(s)) return !0
      const i = s.replacedVariableInits.get(this.scope.thisVariable)
      s.replacedVariableInits.set(this.scope.thisVariable, t.withNew ? new pe() : q)
      const { brokenFlow: n, ignore: r } = s
      return (
        (s.ignore = { breaks: !1, continues: !1, labels: new Set(), returnAwaitYield: !0 }),
        !!this.body.hasEffects(s) ||
          ((s.brokenFlow = n),
          i
            ? s.replacedVariableInits.set(this.scope.thisVariable, i)
            : s.replacedVariableInits.delete(this.scope.thisVariable),
          (s.ignore = r),
          !1)
      )
    }
    include(e, t) {
      ;(this.included = !0), this.id && this.id.include()
      const s = this.scope.argumentsVariable.included
      for (const i of this.params) (i instanceof yt && !s) || i.include(e, t)
      const { brokenFlow: i } = e
      ;(e.brokenFlow = 0), this.body.include(e, t), (e.brokenFlow = i)
    }
    includeCallArguments(e, t) {
      this.scope.includeCallArguments(e, t)
    }
    initialise() {
      null !== this.id && this.id.declare('function', this),
        this.scope.addParameterVariables(
          this.params.map((e) => e.declare('parameter', q)),
          this.params[this.params.length - 1] instanceof xt
        ),
        this.body.addImplicitReturnExpressionToScope()
    }
    parseNode(e) {
      ;(this.body = new this.context.nodeConstructors.BlockStatement(
        e.body,
        this,
        this.scope.hoistedBodyVarScope
      )),
        super.parseNode(e)
    }
  }
  vt.prototype.preventChildBlockScope = !0
  class Et extends vt {
    initialise() {
      super.initialise(), null !== this.id && (this.id.variable.isId = !0)
    }
    parseNode(e) {
      null !== e.id &&
        (this.id = new this.context.nodeConstructors.Identifier(e.id, this, this.scope.parent)),
        super.parseNode(e)
    }
  }
  class bt extends qe {
    include(e, t) {
      super.include(e, t), t && this.context.includeVariable(this.variable)
    }
    initialise() {
      const e = this.declaration
      ;(this.declarationName = (e.id && e.id.name) || this.declaration.name),
        (this.variable = this.scope.addExportDefaultDeclaration(
          this.declarationName || this.context.getModuleName(),
          this,
          this.context
        )),
        this.context.addExport(this)
    }
    render(e, t, s) {
      const { start: i, end: n } = s,
        r = (function (e, t) {
          return C(e, A(e, 'default', t) + 7)
        })(e.original, this.start)
      if (this.declaration instanceof Et)
        this.renderNamedDeclaration(e, r, 'function', '(', null === this.declaration.id, t)
      else if (this.declaration instanceof Xe)
        this.renderNamedDeclaration(e, r, 'class', '{', null === this.declaration.id, t)
      else {
        if (this.variable.getOriginalVariable() !== this.variable) return void b(this, e, i, n)
        if (!this.variable.included)
          return (
            e.remove(this.start, r),
            this.declaration.render(e, t, {
              isCalleeOfRenderedParent: !1,
              renderedParentType: 'ExpressionStatement'
            }),
            void (';' !== e.original[this.end - 1] && e.appendLeft(this.end, ';'))
          )
        this.renderVariableDeclaration(e, r, t)
      }
      this.declaration.render(e, t)
    }
    renderNamedDeclaration(e, t, s, i, n, r) {
      const a = this.variable.getName()
      e.remove(this.start, t),
        n &&
          e.appendLeft(
            (function (e, t, s, i) {
              const n = A(e, t, i) + t.length
              e = e.slice(n, A(e, s, n))
              const r = A(e, '*')
              return -1 === r ? n : n + r + 1
            })(e.original, s, i, t),
            ' ' + a
          ),
        'system' === r.format &&
          this.declaration instanceof Xe &&
          r.exportNamesByVariable.has(this.variable) &&
          e.appendLeft(this.end, ` ${T([this.variable], r)};`)
    }
    renderVariableDeclaration(e, t, s) {
      const i = 59 === e.original.charCodeAt(this.end - 1),
        n = 'system' === s.format && s.exportNamesByVariable.get(this.variable)
      n
        ? (e.overwrite(
            this.start,
            t,
            `${s.varOrConst} ${this.variable.getName()} = exports('${n[0]}', `
          ),
          e.appendRight(i ? this.end - 1 : this.end, ')' + (i ? '' : ';')))
        : (e.overwrite(this.start, t, `${s.varOrConst} ${this.variable.getName()} = `),
          i || e.appendLeft(this.end, ';'))
    }
  }
  bt.prototype.needsBoundaries = !0
  class St extends Ee {
    constructor() {
      super('undefined')
    }
    getLiteralValueAtPath() {}
  }
  class _t extends Ue {
    constructor(e, t, s) {
      super(e, t, t.declaration, s),
        (this.hasId = !1),
        (this.originalId = null),
        (this.originalVariableAndDeclarationModules = null)
      const i = t.declaration
      ;(i instanceof Et || i instanceof Xe) && i.id
        ? ((this.hasId = !0), (this.originalId = i.id))
        : i instanceof yt && (this.originalId = i)
    }
    addReference(e) {
      this.hasId || (this.name = e.name)
    }
    getAssignedVariableName() {
      return (this.originalId && this.originalId.name) || null
    }
    getBaseVariableName() {
      const e = this.getOriginalVariable()
      return e === this ? super.getBaseVariableName() : e.getBaseVariableName()
    }
    getName() {
      const e = this.getOriginalVariable()
      return e === this ? super.getName() : e.getName()
    }
    getOriginalVariable() {
      return this.getOriginalVariableAndDeclarationModules().original
    }
    getOriginalVariableAndDeclarationModules() {
      if (null === this.originalVariableAndDeclarationModules)
        if (
          !this.originalId ||
          (!this.hasId &&
            (this.originalId.variable.isReassigned || this.originalId.variable instanceof St))
        )
          this.originalVariableAndDeclarationModules = { modules: [], original: this }
        else {
          const e = this.originalId.variable
          if (e instanceof _t) {
            const { modules: t, original: s } = e.getOriginalVariableAndDeclarationModules()
            this.originalVariableAndDeclarationModules = {
              modules: t.concat(this.module),
              original: s
            }
          } else
            this.originalVariableAndDeclarationModules = { modules: [this.module], original: e }
        }
      return this.originalVariableAndDeclarationModules
    }
  }
  class At extends Ee {
    constructor(e) {
      super('_missingExportShim'), (this.module = e)
    }
  }
  class kt extends Ee {
    constructor(e, t) {
      super(e.getModuleName()),
        (this.memberVariables = null),
        (this.mergedNamespaces = []),
        (this.referencedEarly = !1),
        (this.references = []),
        (this.context = e),
        (this.module = e.module),
        (this.syntheticNamedExports = t)
    }
    addReference(e) {
      this.references.push(e), (this.name = e.name)
    }
    deoptimizePath() {
      const e = this.getMemberVariables()
      for (const t of Object.keys(e)) e[t].deoptimizePath(F)
    }
    getMemberVariables() {
      if (this.memberVariables) return this.memberVariables
      const e = Object.create(null)
      for (const t of this.context.getExports().concat(this.context.getReexports()))
        '*' !== t[0] &&
          t !== this.module.syntheticNamedExports &&
          (e[t] = this.context.traceExport(t))
      return (this.memberVariables = e)
    }
    include() {
      ;(this.included = !0), this.context.includeAllExports()
    }
    prepareNamespace(e) {
      this.mergedNamespaces = e
      const t = this.context.getModuleExecIndex()
      for (const e of this.references)
        if (e.context.getModuleExecIndex() <= t) {
          this.referencedEarly = !0
          break
        }
    }
    renderBlock(e) {
      const t = e.compact ? '' : ' ',
        s = e.compact ? '' : '\n',
        i = e.indent,
        n = this.getMemberVariables(),
        r = Object.keys(n).map((s) => {
          const r = n[s]
          return this.referencedEarly || r.isReassigned
            ? `${i}get ${s}${t}()${t}{${t}return ${r.getName()}${e.compact ? '' : ';'}${t}}`
            : `${i}${R[s] ? `'${s}'` : s}: ${r.getName()}`
        })
      e.namespaceToStringTag && r.unshift(`${i}[Symbol.toStringTag]:${t}'Module'`)
      const a = this.mergedNamespaces.length > 0 || this.syntheticNamedExports
      a || r.unshift(`${i}__proto__:${t}null`)
      let o = `{${s}${r.join(',' + s)}${s}}`
      if (a) {
        const e = ['/*#__PURE__*/Object.create(null)']
        this.mergedNamespaces.length > 0 &&
          e.push(...this.mergedNamespaces.map((e) => e.getName())),
          this.syntheticNamedExports && e.push(this.module.getSyntheticNamespace().getName()),
          r.length > 0 && e.push(o),
          (o = `/*#__PURE__*/Object.assign(${e.join(',' + t)})`)
      }
      e.freeze && (o = `/*#__PURE__*/Object.freeze(${o})`)
      const h = this.getName()
      return (
        (o = `${e.varOrConst} ${h}${t}=${t}${o};`),
        'system' === e.format && e.exportNamesByVariable.has(this) && (o += `${s}${T([this], e)};`),
        o
      )
    }
    renderFirst() {
      return this.referencedEarly
    }
  }
  kt.prototype.isNamespace = !0
  class Ct extends Ee {
    constructor(e, t, s) {
      super(t), (this.context = e), (this.module = e.module), (this.syntheticNamespace = s)
    }
    getBaseVariable() {
      let e = this.syntheticNamespace
      return (
        e instanceof _t && (e = e.getOriginalVariable()),
        e instanceof Ct && (e = e.getBaseVariable()),
        e
      )
    }
    getBaseVariableName() {
      return this.syntheticNamespace.getBaseVariableName()
    }
    getName() {
      const e = this.name
      return `${this.syntheticNamespace.getName()}${wt(e)}`
    }
    include() {
      this.included || ((this.included = !0), this.context.includeVariable(this.syntheticNamespace))
    }
    setRenderNames(e, t) {
      super.setRenderNames(e, t)
    }
  }
  const wt = (e) => (!R[e] && /^(?!\d)[\w$]+$/.test(e) ? '.' + e : `[${JSON.stringify(e)}]`),
    Pt = "Object.defineProperty(exports, '__esModule', { value: true });",
    It = "Object.defineProperty(exports,'__esModule',{value:true});",
    Nt = {
      auto: '_interopDefault',
      default: null,
      defaultOnly: null,
      esModule: null,
      false: null,
      true: '_interopDefaultLegacy'
    }
  function Tt(e, t) {
    return 'esModule' === e || (t && ('auto' === e || 'true' === e))
  }
  const Lt = {
    auto: '_interopNamespace',
    default: '_interopNamespaceDefault',
    defaultOnly: '_interopNamespaceDefaultOnly',
    esModule: null,
    false: null,
    true: '_interopNamespace'
  }
  function Mt(e, t) {
    return Tt(e, t) && '_interopDefault' === Nt[e]
  }
  const Rt = {
    _interopDefault: (e, t, s, i, n) =>
      `function _interopDefault${e}(e)${e}{${e}return e${e}&&${e}e.__esModule${e}?${e}${n ? $t(e) : Ot(e)}${s}${e}}${t}${t}`,
    _interopDefaultLegacy: (e, t, s, i, n) =>
      `function _interopDefaultLegacy${e}(e)${e}{${e}return e${e}&&${e}typeof e${e}===${e}'object'${e}&&${e}'default'${e}in e${e}?${e}${n ? $t(e) : Ot(e)}${s}${e}}${t}${t}`,
    _interopNamespace: (e, t, s, i, n, r, a) =>
      `function _interopNamespace(e)${e}{${t}` +
      (a.has('_interopNamespaceDefault')
        ? `${i}return e${e}&&${e}e.__esModule${e}?${e}e${e}:${e}_interopNamespaceDefault(e)${s}${t}`
        : `${i}if${e}(e${e}&&${e}e.__esModule)${e}return e;${t}` + Vt(e, t, i, i, n, r)) +
      `}${t}${t}`,
    _interopNamespaceDefault: (e, t, s, i, n, r) =>
      `function _interopNamespaceDefault(e)${e}{${t}` + Vt(e, t, i, i, n, r) + `}${t}${t}`,
    _interopNamespaceDefaultOnly: (e, t, s, i, n, r) =>
      `function _interopNamespaceDefaultOnly(e)${e}{${t}${i}return ${Ft(`{__proto__: null,${e}'default':${e}e}`, r)};${t}}${t}${t}`
  }
  function $t(e) {
    return `e${e}:${e}{${e}'default':${e}e${e}}`
  }
  function Ot(e) {
    return `e['default']${e}:${e}e`
  }
  function Vt(e, t, s, i, n, r) {
    return (
      `${i}var n${e}=${e}Object.create(null);${t}${i}if${e}(e)${e}{${t}${i}${s}Object.keys(e).forEach(function${e}(k)${e}{${t}` +
      (n ? Dt : Bt)(e, t, s, i + s + s) +
      `${i}${s}});${t}` +
      `${i}}${t}` +
      `${i}n['default']${e}=${e}e;${t}` +
      `${i}return ${Ft('n', r)};${t}`
    )
  }
  function Dt(e, t, s, i) {
    return `${i}if${e}(k${e}!==${e}'default')${e}{${t}${i}${s}var d${e}=${e}Object.getOwnPropertyDescriptor(e,${e}k);${t}${i}${s}Object.defineProperty(n,${e}k,${e}d.get${e}?${e}d${e}:${e}{${t}${i}${s}${s}enumerable:${e}true,${t}${i}${s}${s}get:${e}function${e}()${e}{${t}${i}${s}${s}${s}return e[k];${t}${i}${s}${s}}${t}${i}${s}});${t}${i}}${t}`
  }
  function Bt(e, t, s, i) {
    return `${i}n[k]${e}=${e}e[k];${t}`
  }
  function Ft(e, t) {
    return t ? `Object.freeze(${e})` : e
  }
  const Wt = Object.keys(Rt)
  function Ut(e, t, s, i, n, r, a, o = 'return ') {
    const h = n ? '' : ' ',
      l = n ? '' : '\n'
    if (!s)
      return `${l}${l}${o}${(function (e, t, s, i) {
        if (e.length > 0) return e[0].local
        for (const {
          defaultVariableName: e,
          id: n,
          isChunk: r,
          name: a,
          namedExportsMode: o,
          namespaceVariableName: h,
          reexports: l
        } of t)
          if (l) return jt(a, l[0].imported, o, r, e, h, s, n, i)
      })(e, t, i, a)};`
    let c = ''
    for (const { name: e, reexports: i } of t)
      if (i && s)
        for (const t of i)
          '*' === t.reexported &&
            (c && (c += l),
            t.needsLiveBinding
              ? (c += `Object.keys(${e}).forEach(function${h}(k)${h}{${l}${r}if${h}(k${h}!==${h}'default')${h}Object.defineProperty(exports,${h}k,${h}{${l}${r}${r}enumerable:${h}true,${l}${r}${r}get:${h}function${h}()${h}{${l}${r}${r}${r}return ${e}[k];${l}${r}${r}}${l}${r}});${l}});`)
              : (c += `Object.keys(${e}).forEach(function${h}(k)${h}{${l}${r}if${h}(k${h}!==${h}'default')${h}exports[k]${h}=${h}${e}[k];${l}});`))
    for (const {
      defaultVariableName: e,
      id: n,
      isChunk: o,
      name: u,
      namedExportsMode: p,
      namespaceVariableName: d,
      reexports: f
    } of t)
      if (f && s)
        for (const t of f)
          if ('*' !== t.reexported) {
            const s = jt(u, t.imported, p, o, e, d, i, n, a)
            c && (c += l),
              (c +=
                '*' !== t.imported && t.needsLiveBinding
                  ? `Object.defineProperty(exports,${h}'${t.reexported}',${h}{${l}${r}enumerable:${h}true,${l}${r}get:${h}function${h}()${h}{${l}${r}${r}return ${s};${l}${r}}${l}});`
                  : `exports.${t.reexported}${h}=${h}${s};`)
          }
    for (const t of e) {
      const e = 'exports.' + t.exported,
        s = t.local
      e !== s && (c && (c += l), (c += `${e}${h}=${h}${s};`))
    }
    return c ? `${l}${l}${c}` : ''
  }
  function jt(e, t, s, i, n, r, a, o, h) {
    if ('default' === t) {
      if (!i) {
        const t = String(a(o)),
          s = Nt[t] ? n : e
        return Tt(t, h) ? s + "['default']" : s
      }
      return s ? e + "['default']" : e
    }
    return '*' === t ? ((i ? !s : Lt[String(a(o))]) ? r : e) : `${e}.${t}`
  }
  function zt(e, t, s, i, n, r, a, o, h, l) {
    const c = new Set(),
      u = [],
      p = (e, s, i) => {
        c.add(s), u.push(`${t} ${e}${a}=${a}/*#__PURE__*/${s}(${i});`)
      }
    for (const {
      defaultVariableName: t,
      imports: i,
      id: n,
      isChunk: r,
      name: a,
      namedExportsMode: o,
      namespaceVariableName: h,
      reexports: l
    } of e)
      if (r) {
        for (const { imported: e, reexported: t } of [...(i || []), ...(l || [])])
          if ('*' === e && '*' !== t) {
            o || p(h, '_interopNamespaceDefaultOnly', a)
            break
          }
      } else {
        const e = String(s(n))
        let r = !1,
          o = !1
        for (const { imported: s, reexported: n } of [...(i || []), ...(l || [])]) {
          let i, l
          'default' === s
            ? r || ((r = !0), t !== h && ((l = t), (i = Nt[e])))
            : '*' === s && '*' !== n && (o || ((o = !0), (i = Lt[e]), (l = h))),
            i && p(l, i, a)
        }
      }
    return `${(function (e, t, s, i, n, r, a, o) {
      return Wt.map((h) => (e.has(h) || t.has(h) ? Rt[h](s, i, n, r, a, o, e) : '')).join('')
    })(c, r, a, o, h, l, i, n)}${u.length > 0 ? `${u.join(o)}${o}${o}` : ''}`
  }
  const Gt = {
    assert: !0,
    buffer: !0,
    console: !0,
    constants: !0,
    domain: !0,
    events: !0,
    http: !0,
    https: !0,
    os: !0,
    path: !0,
    process: !0,
    punycode: !0,
    querystring: !0,
    stream: !0,
    string_decoder: !0,
    timers: !0,
    tty: !0,
    url: !0,
    util: !0,
    vm: !0,
    zlib: !0
  }
  function Ht(e, t) {
    const s = t.map(({ id: e }) => e).filter((e) => e in Gt)
    s.length &&
      e({
        code: 'MISSING_NODE_BUILTINS',
        message: `Creating a browser bundle that depends on Node.js built-in ${
          1 === s.length
            ? `module ('${s[0]}')`
            : `modules (${s
                .slice(0, -1)
                .map((e) => `'${e}'`)
                .join(', ')} and '${s.slice(-1)}')`
        }. You might need to include https://github.com/ionic-team/rollup-plugin-node-polyfills`,
        modules: s
      })
  }
  function qt(e) {
    return e.replace(/^\t+/, (e) => e.split('\t').join('  '))
  }
  function Kt(e) {
    return e.replace(/[\0?*]/g, '_')
  }
  function Xt(e) {
    const t = Me(e)
    return t.substr(0, t.length - $e(e).length)
  }
  function Yt(e) {
    return 'undefined' != typeof process && Ne(e) ? Oe(process.cwd(), e) : e
  }
  function Qt(e) {
    return !(
      '/' === e[0] ||
      ('.' === e[0] && ('/' === e[1] || '.' === e[1])) ||
      Kt(e) !== e ||
      Ne(e)
    )
  }
  function Jt(e) {
    throw (e instanceof Error || (e = Object.assign(new Error(e.message), e)), e)
  }
  function Zt(e, t, s, i) {
    if ('object' == typeof t) {
      const { line: s, column: n } = t
      e.loc = { file: i, line: s, column: n }
    } else {
      e.pos = t
      const { line: n, column: r } = Ge(s, t, { offsetLine: 1 })
      e.loc = { file: i, line: n, column: r }
    }
    if (void 0 === e.frame) {
      const { line: t, column: i } = e.loc
      e.frame = (function (e, t, s) {
        let i = e.split('\n')
        const n = Math.max(0, t - 3)
        let r = Math.min(t + 2, i.length)
        for (i = i.slice(n, r); !/\S/.test(i[i.length - 1]); ) i.pop(), (r -= 1)
        const a = String(r).length
        return i
          .map((e, i) => {
            const r = n + i + 1 === t
            let o = String(i + n + 1)
            for (; o.length < a; ) o = ' ' + o
            if (r) {
              const t =
                (function (e) {
                  let t = ''
                  for (; e--; ) t += ' '
                  return t
                })(a + 2 + qt(e.slice(0, s)).length) + '^'
              return `${o}: ${qt(e)}\n${t}`
            }
            return `${o}: ${qt(e)}`
          })
          .join('\n')
      })(s, t, i)
    }
  }
  var es, ts
  function ss(e, t, s) {
    return {
      code: 'INVALID_EXPORT_OPTION',
      message: `"${e}" was specified for "output.exports", but entry module "${Yt(s)}" has the following exports: ${t.join(', ')}`
    }
  }
  function is(e) {
    const t = Array.from(e.implicitlyLoadedBefore, (e) => Yt(e.id)).sort()
    return {
      code: es.MISSING_IMPLICIT_DEPENDANT,
      message: `Module "${Yt(e.id)}" that should be implicitly loaded before "${1 === t.length ? t[0] : `${t.slice(0, -1).join('", "')}" and "${t.slice(-1)[0]}`}" is not included in the module graph. Either it was not imported by an included module or only via a tree-shaken dynamic import, or no imported bindings were used and it had otherwise no side-effects.`
    }
  }
  function ns(e, t, s) {
    return {
      code: es.NAMESPACE_CONFLICT,
      message: `Conflicting namespaces: ${Yt(t.id)} re-exports '${e}' from both ${Yt(t.exportsAll[e])} and ${Yt(s.exportsAll[e])} (will be ignored)`,
      name: e,
      reexporter: t.id,
      sources: [t.exportsAll[e], s.exportsAll[e]]
    }
  }
  function rs(e, t, s) {
    const i = s ? 'reexport' : 'import'
    return {
      code: es.UNEXPECTED_NAMED_IMPORT,
      id: e,
      message: `The named export "${t}" was ${i}ed from the external module ${Yt(e)} even though its interop type is "defaultOnly". Either remove or change this ${i} or change the value of the "output.interop" option.`,
      url: 'https://rollupjs.org/guide/en/#outputinterop'
    }
  }
  function as(e) {
    return {
      code: es.UNEXPECTED_NAMED_IMPORT,
      id: e,
      message: `There was a namespace "*" reexport from the external module ${Yt(e)} even though its interop type is "defaultOnly". This will be ignored as namespace reexports only reexport named exports. If this is not intended, either remove or change this reexport or change the value of the "output.interop" option.`,
      url: 'https://rollupjs.org/guide/en/#outputinterop'
    }
  }
  function os(e) {
    return { code: es.VALIDATION_ERROR, message: e }
  }
  function hs(e, t, s) {
    ls(e, t, s.onwarn, s.strictDeprecations)
  }
  function ls(e, t, s, i) {
    if (t || i) {
      const t = (function (e) {
        return { code: es.DEPRECATED_FEATURE, ...('string' == typeof e ? { message: e } : e) }
      })(e)
      if (i) return Jt(t)
      s(t)
    }
  }
  ;((ts = es || (es = {})).ASSET_NOT_FINALISED = 'ASSET_NOT_FINALISED'),
    (ts.ASSET_NOT_FOUND = 'ASSET_NOT_FOUND'),
    (ts.ASSET_SOURCE_ALREADY_SET = 'ASSET_SOURCE_ALREADY_SET'),
    (ts.ASSET_SOURCE_MISSING = 'ASSET_SOURCE_MISSING'),
    (ts.BAD_LOADER = 'BAD_LOADER'),
    (ts.CANNOT_EMIT_FROM_OPTIONS_HOOK = 'CANNOT_EMIT_FROM_OPTIONS_HOOK'),
    (ts.CHUNK_NOT_GENERATED = 'CHUNK_NOT_GENERATED'),
    (ts.DEPRECATED_FEATURE = 'DEPRECATED_FEATURE'),
    (ts.FILE_NOT_FOUND = 'FILE_NOT_FOUND'),
    (ts.FILE_NAME_CONFLICT = 'FILE_NAME_CONFLICT'),
    (ts.INPUT_HOOK_IN_OUTPUT_PLUGIN = 'INPUT_HOOK_IN_OUTPUT_PLUGIN'),
    (ts.INVALID_CHUNK = 'INVALID_CHUNK'),
    (ts.INVALID_EXPORT_OPTION = 'INVALID_EXPORT_OPTION'),
    (ts.INVALID_EXTERNAL_ID = 'INVALID_EXTERNAL_ID'),
    (ts.INVALID_OPTION = 'INVALID_OPTION'),
    (ts.INVALID_PLUGIN_HOOK = 'INVALID_PLUGIN_HOOK'),
    (ts.INVALID_ROLLUP_PHASE = 'INVALID_ROLLUP_PHASE'),
    (ts.MISSING_IMPLICIT_DEPENDANT = 'MISSING_IMPLICIT_DEPENDANT'),
    (ts.MIXED_EXPORTS = 'MIXED_EXPORTS'),
    (ts.NAMESPACE_CONFLICT = 'NAMESPACE_CONFLICT'),
    (ts.NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE = 'NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE'),
    (ts.PLUGIN_ERROR = 'PLUGIN_ERROR'),
    (ts.PREFER_NAMED_EXPORTS = 'PREFER_NAMED_EXPORTS'),
    (ts.UNEXPECTED_NAMED_IMPORT = 'UNEXPECTED_NAMED_IMPORT'),
    (ts.UNRESOLVED_ENTRY = 'UNRESOLVED_ENTRY'),
    (ts.UNRESOLVED_IMPORT = 'UNRESOLVED_IMPORT'),
    (ts.VALIDATION_ERROR = 'VALIDATION_ERROR'),
    (ts.EXTERNAL_SYNTHETIC_EXPORTS = 'EXTERNAL_SYNTHETIC_EXPORTS'),
    (ts.SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT =
      'SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT')
  const cs = /^[a-zA-Z$_][a-zA-Z0-9$_]*$/
  function us(e) {
    return cs.test(e) ? '.' + e : `['${e}']`
  }
  function ps(e) {
    return e.split('.').map(us).join('')
  }
  function ds(e, t, s, i, n) {
    const r = i ? '' : ' ',
      a = e.split('.')
    a[0] = ('function' == typeof s ? s(a[0]) : s[a[0]]) || a[0]
    const o = a.pop()
    let h = t,
      l = a
        .map((e) => ((h += us(e)), `${h}${r}=${r}${h}${r}||${r}{}`))
        .concat(`${h}${us(o)}`)
        .join(',' + r)
        .concat(`${r}=${r}${n}`)
    return a.length > 0 && (l = `(${l})`), l
  }
  function fs(e) {
    let t = e.length
    for (; t--; ) {
      const { imports: s, reexports: i } = e[t]
      if (s || i) return e.slice(0, t + 1)
    }
    return []
  }
  const ms = (e) => 'this' + ps(e)
  function gs({ dependencies: e, exports: t }) {
    const s = new Set(t.map((e) => e.exported))
    s.has('default') || s.add('default')
    for (const { reexports: t } of e)
      if (t) for (const e of t) '*' === e.imported || s.has(e.reexported) || s.add(e.reexported)
    return s
  }
  function ys(e, t, s, i) {
    return 0 === e.length
      ? ''
      : 1 === e.length
        ? `${s}${s}${s}exports('${e[0].name}',${t}${e[0].value});${i}${i}`
        : `${s}${s}${s}exports({${i}` +
          e.map(({ name: e, value: i }) => `${s}${s}${s}${s}${e}:${t}${i}`).join(',' + i) +
          `${i}${s}${s}${s}});${i}${i}`
  }
  function xs(e, t) {
    return e ? `${t}${ps(e)}` : 'null'
  }
  var vs = {
    system: function (
      e,
      {
        accessedGlobals: t,
        dependencies: s,
        exports: i,
        hasExports: n,
        indentString: r,
        intro: a,
        outro: o,
        usesTopLevelAwait: h,
        varOrConst: l
      },
      c
    ) {
      const u = c.compact ? '' : '\n',
        p = c.compact ? '' : ' ',
        d = s.map((e) => `'${e.id}'`),
        f = []
      let m
      const g = []
      for (const { imports: e, reexports: t } of s) {
        const n = []
        if (e)
          for (const t of e)
            f.push(t.local),
              '*' === t.imported
                ? n.push(`${t.local}${p}=${p}module;`)
                : n.push(`${t.local}${p}=${p}module.${t.imported};`)
        if (t) {
          let e = !1
          if (
            t.length > 1 ||
            (1 === t.length && ('*' === t[0].reexported || '*' === t[0].imported))
          ) {
            for (const a of t)
              '*' === a.reexported &&
                (m || (m = gs({ dependencies: s, exports: i })),
                e || (n.push(`${l} _setter${p}=${p}{};`), (e = !0)),
                n.push(`for${p}(var _$p${p}in${p}module)${p}{`),
                n.push(`${r}if${p}(!_starExcludes[_$p])${p}_setter[_$p]${p}=${p}module[_$p];`),
                n.push('}'))
            for (const e of t)
              '*' === e.imported &&
                '*' !== e.reexported &&
                n.push(`exports('${e.reexported}',${p}module);`)
            for (const s of t)
              '*' !== s.reexported &&
                '*' !== s.imported &&
                (e || (n.push(`${l} _setter${p}=${p}{};`), (e = !0)),
                n.push(`_setter.${s.reexported}${p}=${p}module.${s.imported};`))
            e && n.push('exports(_setter);')
          } else for (const e of t) n.push(`exports('${e.reexported}',${p}module.${e.imported});`)
        }
        g.push(n.join(`${u}${r}${r}${r}`))
      }
      const y = c.name ? `'${c.name}',${p}` : '',
        x = t.has('module') ? `exports,${p}module` : n ? 'exports' : ''
      let v =
        `System.register(${y}[` +
        d.join(',' + p) +
        `],${p}function${p}(${x})${p}{${u}${r}${c.strict ? "'use strict';" : ''}` +
        ((e, t, s, i, n) =>
          e
            ? `${n}${i}${t} _starExcludes${s}=${s}{${s}${[...e].map((e) => `${e}:${s}1`).join(',' + s)}${s}};`
            : '')(m, l, p, r, u) +
        ((e, t, s, i) => (e.length ? `${i}${s}var ${e.join(',' + t)};` : ''))(f, p, r, u) +
        `${u}${r}return${p}{${g.length ? `${u}${r}${r}setters:${p}[${g.map((e) => (e ? `function${p}(module)${p}{${u}${r}${r}${r}${e}${u}${r}${r}}` : c.systemNullSetters ? 'null' : `function${p}()${p}{}`)).join(',' + p)}],` : ''}${u}`
      v +=
        `${r}${r}execute:${p}${h ? 'async' + p : ''}function${p}()${p}{${u}${u}` +
        ((e, t, s, i) =>
          ys(
            e
              .filter((e) => e.hoisted || e.uninitialized)
              .map((e) => ({ name: e.exported, value: e.uninitialized ? 'void 0' : e.local })),
            t,
            s,
            i
          ))(i, p, r, u)
      const E =
        `${u}${u}` +
        ((e, t, s, i) =>
          ys(
            e.filter((e) => e.expression).map((e) => ({ name: e.exported, value: e.local })),
            t,
            s,
            i
          ))(i, p, r, u) +
        ((e, t, s, i) =>
          ys(
            e
              .filter((e) => '_missingExportShim' === e.local)
              .map((e) => ({ name: e.exported, value: '_missingExportShim' })),
            t,
            s,
            i
          ))(i, p, r, u) +
        `${r}${r}}${u}${r}}${c.compact ? '' : ';'}${u}});`
      return a && e.prepend(a), o && e.append(o), e.indent(`${r}${r}${r}`).append(E).prepend(v)
    },
    amd: function (
      e,
      {
        accessedGlobals: t,
        dependencies: s,
        exports: i,
        hasExports: n,
        indentString: r,
        intro: a,
        isEntryModuleFacade: o,
        namedExportsMode: h,
        outro: l,
        varOrConst: c,
        warn: u
      },
      {
        amd: { define: p, id: d },
        compact: f,
        esModule: m,
        externalLiveBindings: g,
        freeze: y,
        interop: x,
        strict: v
      }
    ) {
      Ht(u, s)
      const E = s.map((e) => {
          return `'${((t = e.id), '.' === t[0] && t.endsWith('.js') ? t.slice(0, -3) : t)}'`
          var t
        }),
        b = s.map((e) => e.name),
        S = f ? '' : '\n',
        _ = f ? '' : ';',
        A = f ? '' : ' '
      h && n && (b.unshift('exports'), E.unshift("'exports'")),
        t.has('require') && (b.unshift('require'), E.unshift("'require'")),
        t.has('module') && (b.unshift('module'), E.unshift("'module'"))
      const k = (d ? `'${d}',${A}` : '') + (E.length ? `[${E.join(',' + A)}],${A}` : ''),
        C = v ? A + "'use strict';" : ''
      e.prepend(`${a}${zt(s, c, x, g, y, t, A, S, _, r)}`)
      const w = Ut(i, s, h, x, f, r, g)
      return (
        w && e.append(w),
        h && n && o && m && e.append(`${S}${S}${f ? It : Pt}`),
        l && e.append(l),
        e
          .indent(r)
          .prepend(`${p}(${k}function${A}(${b.join(',' + A)})${A}{${C}${S}${S}`)
          .append(`${S}${S}});`)
      )
    },
    cjs: function (
      e,
      {
        accessedGlobals: t,
        dependencies: s,
        exports: i,
        hasExports: n,
        indentString: r,
        intro: a,
        isEntryModuleFacade: o,
        namedExportsMode: h,
        outro: l,
        varOrConst: c
      },
      { compact: u, esModule: p, externalLiveBindings: d, freeze: f, interop: m, strict: g }
    ) {
      const y = u ? '' : '\n',
        x = u ? '' : ';',
        v = u ? '' : ' ',
        E = g ? `'use strict';${y}${y}` : '',
        b = h && n && o && p ? `${u ? It : Pt}${y}${y}` : '',
        S = (function (e, t, s, i, n) {
          let r = '',
            a = !1
          for (const { id: o, name: h, reexports: l, imports: c } of e)
            l || c
              ? ((r += t && a ? ',' : `${r ? ';' + i : ''}${s} `),
                (a = !0),
                (r += `${h}${n}=${n}require('${o}')`))
              : (r && (r += !t || a ? ';' + i : ','), (a = !1), (r += `require('${o}')`))
          return r ? `${r};${i}${i}` : ''
        })(s, u, c, y, v),
        _ = zt(s, c, m, d, f, t, v, y, x, r)
      e.prepend(`${E}${a}${b}${S}${_}`)
      const A = Ut(i, s, h, m, u, r, d, `module.exports${v}=${v}`)
      return e.append(`${A}${l}`)
    },
    es: function (
      e,
      { intro: t, outro: s, dependencies: i, exports: n, varOrConst: r },
      { compact: a }
    ) {
      const o = a ? '' : ' ',
        h = a ? '' : '\n',
        l = (function (e, t) {
          const s = []
          for (const { id: i, reexports: n, imports: r, name: a } of e)
            if (n || r) {
              if (r) {
                let e = null,
                  n = null
                const a = []
                for (const t of r)
                  'default' === t.imported ? (e = t) : '*' === t.imported ? (n = t) : a.push(t)
                n && s.push(`import${t}*${t}as ${n.local} from${t}'${i}';`),
                  e && 0 === a.length
                    ? s.push(`import ${e.local} from${t}'${i}';`)
                    : a.length > 0 &&
                      s.push(
                        `import ${e ? `${e.local},${t}` : ''}{${t}${a.map((e) => (e.imported === e.local ? e.imported : `${e.imported} as ${e.local}`)).join(',' + t)}${t}}${t}from${t}'${i}';`
                      )
              }
              if (n) {
                let e = null
                const o = [],
                  h = []
                for (const t of n)
                  '*' === t.reexported ? (e = t) : '*' === t.imported ? o.push(t) : h.push(t)
                if ((e && s.push(`export${t}*${t}from${t}'${i}';`), o.length > 0)) {
                  ;(r && r.some((e) => '*' === e.imported && e.local === a)) ||
                    s.push(`import${t}*${t}as ${a} from${t}'${i}';`)
                  for (const e of o)
                    s.push(
                      `export${t}{${t}${a === e.reexported ? a : `${a} as ${e.reexported}`} };`
                    )
                }
                h.length > 0 &&
                  s.push(
                    `export${t}{${t}${h.map((e) => (e.imported === e.reexported ? e.imported : `${e.imported} as ${e.reexported}`)).join(',' + t)}${t}}${t}from${t}'${i}';`
                  )
              }
            } else s.push(`import${t}'${i}';`)
          return s
        })(i, o)
      l.length > 0 && (t += l.join(h) + h + h), t && e.prepend(t)
      const c = (function (e, t, s) {
        const i = [],
          n = []
        for (const r of e)
          'default' === r.exported
            ? i.push(`export default ${r.local};`)
            : (r.expression && i.push(`${s} ${r.local}${t}=${t}${r.expression};`),
              n.push(r.exported === r.local ? r.local : `${r.local} as ${r.exported}`))
        return n.length && i.push(`export${t}{${t}${n.join(',' + t)}${t}};`), i
      })(n, o, r)
      return c.length && e.append(h + h + c.join(h).trim()), s && e.append(s), e.trim()
    },
    iife: function (
      e,
      {
        accessedGlobals: t,
        dependencies: s,
        exports: i,
        hasExports: n,
        indentString: r,
        intro: a,
        namedExportsMode: o,
        outro: h,
        varOrConst: l,
        warn: c
      },
      {
        compact: u,
        extend: p,
        freeze: d,
        externalLiveBindings: f,
        globals: m,
        interop: g,
        name: y,
        strict: x
      }
    ) {
      const v = u ? '' : ' ',
        E = u ? '' : ';',
        b = u ? '' : '\n',
        S = y && -1 !== y.indexOf('.'),
        _ = !p && !S
      if (y && _ && (Ce((A = y)) || Ae.has(A) || ke.test(A)))
        return Jt({
          code: 'ILLEGAL_IDENTIFIER_AS_NAME',
          message: `Given name "${y}" is not a legal JS identifier. If you need this, you can try "output.extend: true".`
        })
      var A
      Ht(c, s)
      const k = fs(s),
        C = k.map((e) => e.globalName || 'null'),
        w = k.map((e) => e.name)
      n &&
        !y &&
        c({
          code: 'MISSING_NAME_OPTION_FOR_IIFE_EXPORT',
          message:
            'If you do not supply "output.name", you may not be able to access the exports of an IIFE bundle.'
        }),
        o &&
          n &&
          (p
            ? (C.unshift(`${ms(y)}${v}=${v}${ms(y)}${v}||${v}{}`), w.unshift('exports'))
            : (C.unshift('{}'), w.unshift('exports')))
      const P = x ? `${r}'use strict';${b}` : '',
        I = zt(s, l, g, f, d, t, v, b, E, r)
      e.prepend(`${a}${I}`)
      let N = `(function${v}(${w.join(',' + v)})${v}{${b}${P}${b}`
      n &&
        (!y || (p && o) || (N = (_ ? `${l} ${y}` : ms(y)) + `${v}=${v}${N}`),
        S &&
          (N =
            (function (e, t, s, i) {
              const n = i ? '' : ' ',
                r = e.split('.')
              ;(r[0] = ('function' == typeof s ? s(r[0]) : s[r[0]]) || r[0]), r.pop()
              let a = 'this'
              return (
                r
                  .map((e) => ((a += us(e)), `${a}${n}=${n}${a}${n}||${n}{}${i ? '' : ';'}`))
                  .join(i ? ',' : '\n') + (i && r.length ? ';' : '\n')
              )
            })(y, 0, m, u) + N))
      let T = `${b}${b}}(${C.join(',' + v)}));`
      n && !p && o && (T = `${b}${b}${r}return exports;${T}`)
      const L = Ut(i, s, o, g, u, r, f)
      return e.append(`${L}${h}`), e.indent(r).prepend(N).append(T)
    },
    umd: function (
      e,
      {
        accessedGlobals: t,
        dependencies: s,
        exports: i,
        hasExports: n,
        indentString: r,
        intro: a,
        namedExportsMode: o,
        outro: h,
        varOrConst: l,
        warn: c
      },
      {
        amd: { define: u, id: p },
        compact: d,
        esModule: f,
        extend: m,
        externalLiveBindings: g,
        freeze: y,
        interop: x,
        name: v,
        globals: E,
        noConflict: b,
        strict: S
      }
    ) {
      const _ = d ? '' : ' ',
        A = d ? '' : '\n',
        k = d ? '' : ';',
        C = d ? 'f' : 'factory',
        w = d ? 'g' : 'global'
      if (n && !v)
        return Jt({
          code: 'MISSING_NAME_OPTION_FOR_IIFE_EXPORT',
          message:
            'You must supply "output.name" for UMD bundles that have exports so that the exports are accessible in environments without a module loader.'
        })
      Ht(c, s)
      const P = s.map((e) => `'${e.id}'`),
        I = s.map((e) => `require('${e.id}')`),
        N = fs(s),
        T = N.map((e) => xs(e.globalName, w)),
        L = N.map((e) => e.name)
      o &&
        (n || b) &&
        (P.unshift("'exports'"),
        I.unshift('exports'),
        T.unshift(ds(v, w, E, d, (m ? `${xs(v, w)}${_}||${_}` : '') + '{}')),
        L.unshift('exports'))
      const M = (p ? `'${p}',${_}` : '') + (P.length ? `[${P.join(',' + _)}],${_}` : ''),
        R = u,
        $ = !o && n ? `module.exports${_}=${_}` : '',
        O = S ? `${_}'use strict';${A}` : ''
      let V
      if (b) {
        const e = d ? 'e' : 'exports'
        let t
        ;(t =
          !o && n
            ? `var ${e}${_}=${_}${ds(v, w, E, d, `${C}(${T.join(',' + _)})`)};`
            : `var ${e}${_}=${_}${T.shift()};${A}${r}${r}${C}(${[e].concat(T).join(',' + _)});`),
          (V =
            `(function${_}()${_}{${A}${r}${r}var current${_}=${_}${(function (e, t, s) {
              const i = e.split('.')
              let n = t
              return i.map((e) => (n += us(e))).join(`${s}&&${s}`)
            })(
              v,
              w,
              _
            )};${A}${r}${r}${t}${A}${r}${r}${e}.noConflict${_}=${_}function${_}()${_}{${_}${xs(v, w)}${_}=${_}current;${_}return ${e}${d ? '' : '; '}};${A}` +
            r +
            '}())')
      } else (V = `${C}(${T.join(',' + _)})`), !o && n && (V = ds(v, w, E, d, V))
      const D = n || (b && o) || T.length > 0,
        B = D ? 'this,' + _ : '',
        F = D
          ? `(${w}${_}=${_}typeof globalThis${_}!==${_}'undefined'${_}?${_}globalThis${_}:${_}${w}${_}||${_}self,${_}`
          : '',
        W = D ? ')' : '',
        U =
          `(function${_}(${D ? `${w},${_}` : ''}${C})${_}{${A}` +
          (D
            ? `${r}typeof exports${_}===${_}'object'${_}&&${_}typeof module${_}!==${_}'undefined'${_}?${_}${$}${C}(${I.join(',' + _)})${_}:${A}`
            : '') +
          `${r}typeof ${R}${_}===${_}'function'${_}&&${_}${R}.amd${_}?${_}${R}(${M}${C})${_}:${A}` +
          `${r}${F}${V}${W};${A}` +
          `}(${B}(function${_}(${L.join(', ')})${_}{${O}${A}`,
        j = A + A + '})));'
      e.prepend(`${a}${zt(s, l, x, g, y, t, _, A, k, r)}`)
      const z = Ut(i, s, o, x, d, r, g)
      return (
        z && e.append(z),
        o && n && f && e.append(A + A + (d ? It : Pt)),
        h && e.append(h),
        e.trim().indent(r).append(j).prepend(U)
      )
    }
  }
  const Es = {
      ArrayPattern(e, t) {
        for (const s of t.elements) s && Es[s.type](e, s)
      },
      AssignmentPattern(e, t) {
        Es[t.left.type](e, t.left)
      },
      Identifier(e, t) {
        e.push(t.name)
      },
      MemberExpression() {},
      ObjectPattern(e, t) {
        for (const s of t.properties)
          'RestElement' === s.type ? Es.RestElement(e, s) : Es[s.value.type](e, s.value)
      },
      RestElement(e, t) {
        Es[t.argument.type](e, t.argument)
      }
    },
    bs = function (e) {
      const t = []
      return Es[e.type](t, e), t
    }
  class Ss extends qe {
    hasEffects() {
      return !1
    }
    initialise() {
      this.context.addExport(this)
    }
    render(e, t, s) {
      e.remove(s.start, s.end)
    }
  }
  Ss.prototype.needsBoundaries = !0
  class _s extends ze {
    addDeclaration(e, t, s, i) {
      return i ? this.parent.addDeclaration(e, t, q, i) : super.addDeclaration(e, t, s, !1)
    }
  }
  class As extends qe {
    initialise() {
      this.directive &&
        'use strict' !== this.directive &&
        'Program' === this.parent.type &&
        this.context.warn(
          {
            code: 'MODULE_LEVEL_DIRECTIVE',
            message: `Module level directives cause errors when bundled, '${this.directive}' was ignored.`
          },
          this.start
        )
    }
    render(e, t) {
      super.render(e, t), this.included && this.insertSemicolon(e)
    }
    shouldBeIncluded(e) {
      return this.directive && 'use strict' !== this.directive
        ? 'Program' !== this.parent.type
        : super.shouldBeIncluded(e)
    }
  }
  class ks extends qe {
    constructor() {
      super(...arguments), (this.directlyIncluded = !1)
    }
    addImplicitReturnExpressionToScope() {
      const e = this.body[this.body.length - 1]
      ;(e && 'ReturnStatement' === e.type) || this.scope.addReturnExpression(q)
    }
    createScope(e) {
      this.scope = this.parent.preventChildBlockScope ? e : new _s(e)
    }
    hasEffects(e) {
      if (this.deoptimizeBody) return !0
      for (const t of this.body) {
        if (t.hasEffects(e)) return !0
        if (e.brokenFlow) break
      }
      return !1
    }
    include(e, t) {
      if (!this.deoptimizeBody || !this.directlyIncluded) {
        ;(this.included = !0), (this.directlyIncluded = !0), this.deoptimizeBody && (t = !0)
        for (const s of this.body) (t || s.shouldBeIncluded(e)) && s.include(e, t)
      }
    }
    initialise() {
      const e = this.body[0]
      this.deoptimizeBody = e instanceof As && 'use asm' === e.directive
    }
    render(e, t) {
      this.body.length ? P(this.body, e, this.start + 1, this.end - 1, t) : super.render(e, t)
    }
  }
  class Cs extends qe {
    createScope(e) {
      this.scope = new et(e, this.context)
    }
    deoptimizePath(e) {
      1 === e.length && e[0] === D && this.scope.getReturnExpression().deoptimizePath(F)
    }
    getReturnExpressionWhenCalledAtPath(e) {
      return 0 === e.length ? this.scope.getReturnExpression() : q
    }
    hasEffects() {
      return !1
    }
    hasEffectsWhenAccessedAtPath(e) {
      return e.length > 1
    }
    hasEffectsWhenAssignedAtPath(e) {
      return e.length > 1
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      if (e.length > 0) return !0
      for (const e of this.params) if (e.hasEffects(s)) return !0
      const { ignore: i, brokenFlow: n } = s
      return (
        (s.ignore = { breaks: !1, continues: !1, labels: new Set(), returnAwaitYield: !0 }),
        !!this.body.hasEffects(s) || ((s.ignore = i), (s.brokenFlow = n), !1)
      )
    }
    include(e, t) {
      this.included = !0
      for (const s of this.params) s instanceof yt || s.include(e, t)
      const { brokenFlow: s } = e
      ;(e.brokenFlow = 0), this.body.include(e, t), (e.brokenFlow = s)
    }
    includeCallArguments(e, t) {
      this.scope.includeCallArguments(e, t)
    }
    initialise() {
      this.scope.addParameterVariables(
        this.params.map((e) => e.declare('parameter', q)),
        this.params[this.params.length - 1] instanceof xt
      ),
        this.body instanceof ks
          ? this.body.addImplicitReturnExpressionToScope()
          : this.scope.addReturnExpression(this.body)
    }
    parseNode(e) {
      'BlockStatement' === e.body.type &&
        (this.body = new this.context.nodeConstructors.BlockStatement(
          e.body,
          this,
          this.scope.hoistedBodyVarScope
        )),
        super.parseNode(e)
    }
  }
  Cs.prototype.preventChildBlockScope = !0
  const ws = {
    '!=': (e, t) => e != t,
    '!==': (e, t) => e !== t,
    '%': (e, t) => e % t,
    '&': (e, t) => e & t,
    '*': (e, t) => e * t,
    '**': (e, t) => e ** t,
    '+': (e, t) => e + t,
    '-': (e, t) => e - t,
    '/': (e, t) => e / t,
    '<': (e, t) => e < t,
    '<<': (e, t) => e << t,
    '<=': (e, t) => e <= t,
    '==': (e, t) => e == t,
    '===': (e, t) => e === t,
    '>': (e, t) => e > t,
    '>=': (e, t) => e >= t,
    '>>': (e, t) => e >> t,
    '>>>': (e, t) => e >>> t,
    '^': (e, t) => e ^ t,
    in: () => H,
    instanceof: () => H,
    '|': (e, t) => e | t
  }
  class Ps extends qe {
    getLiteralValueAtPath(e) {
      return e.length > 0 ||
        (null === this.value && 110 !== this.context.code.charCodeAt(this.start)) ||
        'bigint' == typeof this.value ||
        47 === this.context.code.charCodeAt(this.start)
        ? H
        : this.value
    }
    getReturnExpressionWhenCalledAtPath(e) {
      return 1 !== e.length ? q : ve(this.members, e[0])
    }
    hasEffectsWhenAccessedAtPath(e) {
      return null === this.value ? e.length > 0 : e.length > 1
    }
    hasEffectsWhenAssignedAtPath(e) {
      return e.length > 0
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return 1 !== e.length || xe(this.members, e[0], this.included, t, s)
    }
    initialise() {
      this.members = (function (e) {
        switch (typeof e) {
          case 'boolean':
            return me
          case 'number':
            return ge
          case 'string':
            return ye
          default:
            return Object.create(null)
        }
      })(this.value)
    }
    parseNode(e) {
      ;(this.value = e.value), (this.regex = e.regex), super.parseNode(e)
    }
    render(e) {
      'string' == typeof this.value && e.indentExclusionRanges.push([this.start + 1, this.end - 1])
    }
  }
  class Is extends qe {
    constructor() {
      super(...arguments),
        (this.variable = null),
        (this.bound = !1),
        (this.expressionsToBeDeoptimized = []),
        (this.replacement = null),
        (this.wasPathDeoptimizedWhileOptimized = !1)
    }
    addExportedVariables() {}
    bind() {
      if (this.bound) return
      this.bound = !0
      const e = (function e(t) {
          const s = t.propertyKey,
            i = t.object
          if ('string' == typeof s) {
            if (i instanceof yt)
              return [
                { key: i.name, pos: i.start },
                { key: s, pos: t.property.start }
              ]
            if (i instanceof Is) {
              const n = e(i)
              return n && [...n, { key: s, pos: t.property.start }]
            }
          }
          return null
        })(this),
        t = e && this.scope.findVariable(e[0].key)
      if (t && t.isNamespace) {
        const s = this.resolveNamespaceVariables(t, e.slice(1))
        s
          ? 'string' == typeof s
            ? (this.replacement = s)
            : (s instanceof be && s.module && s.module.suggestName(e[0].key),
              (this.variable = s),
              this.scope.addNamespaceMemberAccess(
                (function (e) {
                  let t = e[0].key
                  for (let s = 1; s < e.length; s++) t += '.' + e[s].key
                  return t
                })(e),
                s
              ))
          : super.bind()
      } else super.bind(), this.getPropertyKey()
    }
    deoptimizeCache() {
      const e = this.expressionsToBeDeoptimized
      ;(this.expressionsToBeDeoptimized = []),
        (this.propertyKey = D),
        this.wasPathDeoptimizedWhileOptimized && this.object.deoptimizePath(F)
      for (const t of e) t.deoptimizeCache()
    }
    deoptimizePath(e) {
      if (
        (this.bound || this.bind(),
        0 === e.length && this.disallowNamespaceReassignment(),
        this.variable)
      )
        this.variable.deoptimizePath(e)
      else {
        const t = this.getPropertyKey()
        t === D
          ? this.object.deoptimizePath(F)
          : ((this.wasPathDeoptimizedWhileOptimized = !0), this.object.deoptimizePath([t, ...e]))
      }
    }
    getLiteralValueAtPath(e, t, s) {
      return (
        this.bound || this.bind(),
        null !== this.variable
          ? this.variable.getLiteralValueAtPath(e, t, s)
          : (this.expressionsToBeDeoptimized.push(s),
            this.object.getLiteralValueAtPath([this.getPropertyKey(), ...e], t, s))
      )
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      return (
        this.bound || this.bind(),
        null !== this.variable
          ? this.variable.getReturnExpressionWhenCalledAtPath(e, t, s)
          : (this.expressionsToBeDeoptimized.push(s),
            this.object.getReturnExpressionWhenCalledAtPath([this.getPropertyKey(), ...e], t, s))
      )
    }
    hasEffects(e) {
      return (
        this.property.hasEffects(e) ||
        this.object.hasEffects(e) ||
        (this.context.options.treeshake.propertyReadSideEffects &&
          this.object.hasEffectsWhenAccessedAtPath([this.propertyKey], e))
      )
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      return (
        0 !== e.length &&
        (null !== this.variable
          ? this.variable.hasEffectsWhenAccessedAtPath(e, t)
          : this.object.hasEffectsWhenAccessedAtPath([this.propertyKey, ...e], t))
      )
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      return null !== this.variable
        ? this.variable.hasEffectsWhenAssignedAtPath(e, t)
        : this.object.hasEffectsWhenAssignedAtPath([this.propertyKey, ...e], t)
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return null !== this.variable
        ? this.variable.hasEffectsWhenCalledAtPath(e, t, s)
        : this.object.hasEffectsWhenCalledAtPath([this.propertyKey, ...e], t, s)
    }
    include(e, t) {
      this.included ||
        ((this.included = !0),
        null !== this.variable && this.context.includeVariable(this.variable)),
        this.object.include(e, t),
        this.property.include(e, t)
    }
    includeCallArguments(e, t) {
      this.variable ? this.variable.includeCallArguments(e, t) : super.includeCallArguments(e, t)
    }
    initialise() {
      this.propertyKey = (function (e) {
        return e.computed
          ? (function (e) {
              return e instanceof Ps ? String(e.value) : null
            })(e.property)
          : e.property.name
      })(this)
    }
    render(e, t, { renderedParentType: s, isCalleeOfRenderedParent: i } = st) {
      const n = 'CallExpression' === s && i
      if (this.variable || this.replacement) {
        let t = this.variable ? this.variable.getName() : this.replacement
        n && (t = '0, ' + t),
          e.overwrite(this.start, this.end, t, { contentOnly: !0, storeName: !0 })
      } else n && e.appendRight(this.start, '0, '), super.render(e, t)
    }
    disallowNamespaceReassignment() {
      this.object instanceof yt &&
        this.scope.findVariable(this.object.name).isNamespace &&
        (this.variable && this.context.includeVariable(this.variable),
        this.context.warn(
          {
            code: 'ILLEGAL_NAMESPACE_REASSIGNMENT',
            message: `Illegal reassignment to import '${this.object.name}'`
          },
          this.start
        ))
    }
    getPropertyKey() {
      if (null === this.propertyKey) {
        this.propertyKey = D
        const e = this.property.getLiteralValueAtPath(B, j, this)
        return (this.propertyKey = e === H ? D : String(e))
      }
      return this.propertyKey
    }
    resolveNamespaceVariables(e, t) {
      if (0 === t.length) return e
      if (!e.isNamespace) return null
      const s = t[0].key,
        i = e instanceof be ? e.module.getVariableForExportName(s) : e.context.traceExport(s)
      if (!i) {
        const i = e instanceof be ? e.module.id : e.context.fileName
        return (
          this.context.warn(
            {
              code: 'MISSING_EXPORT',
              exporter: Yt(i),
              importer: Yt(this.context.fileName),
              message: `'${s}' is not exported by '${Yt(i)}'`,
              missing: s,
              url: 'https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module'
            },
            t[0].pos
          ),
          'undefined'
        )
      }
      return this.resolveNamespaceVariables(i, t.slice(1))
    }
  }
  class Ns extends Ze {
    addDeclaration(e, t, s, i) {
      return i ? this.parent.addDeclaration(e, t, s, i) : super.addDeclaration(e, t, s, !1)
    }
  }
  class Ts extends qe {
    createScope(e) {
      this.scope = new Ns(e, this.context)
    }
    initialise() {
      this.param && this.param.declare('parameter', q)
    }
    parseNode(e) {
      ;(this.body = new this.context.nodeConstructors.BlockStatement(e.body, this, this.scope)),
        super.parseNode(e)
    }
  }
  Ts.prototype.preventChildBlockScope = !0
  class Ls extends ze {
    findLexicalBoundary() {
      return this
    }
  }
  class Ms extends qe {
    hasEffects(e) {
      return this.key.hasEffects(e)
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      return e.length > 0 || this.value.hasEffectsWhenCalledAtPath(B, t, s)
    }
  }
  class Rs {
    constructor(e) {
      ;(this.included = !1), (this.expressions = e)
    }
    deoptimizePath(e) {
      for (const t of this.expressions) t.deoptimizePath(e)
    }
    getLiteralValueAtPath() {
      return H
    }
    getReturnExpressionWhenCalledAtPath(e, t, s) {
      return new Rs(this.expressions.map((i) => i.getReturnExpressionWhenCalledAtPath(e, t, s)))
    }
    hasEffectsWhenAccessedAtPath(e, t) {
      for (const s of this.expressions) if (s.hasEffectsWhenAccessedAtPath(e, t)) return !0
      return !1
    }
    hasEffectsWhenAssignedAtPath(e, t) {
      for (const s of this.expressions) if (s.hasEffectsWhenAssignedAtPath(e, t)) return !0
      return !1
    }
    hasEffectsWhenCalledAtPath(e, t, s) {
      for (const i of this.expressions) if (i.hasEffectsWhenCalledAtPath(e, t, s)) return !0
      return !1
    }
    include(e, t) {
      for (const s of this.expressions) s.included || s.include(e, t)
    }
    includeCallArguments() {}
  }
  class $s extends qe {
    bind() {
      null !== this.declaration && this.declaration.bind()
    }
    hasEffects(e) {
      return null !== this.declaration && this.declaration.hasEffects(e)
    }
    initialise() {
      this.context.addExport(this)
    }
    render(e, t, s) {
      const { start: i, end: n } = s
      null === this.declaration
        ? e.remove(i, n)
        : (e.remove(this.start, this.declaration.start),
          this.declaration.render(e, t, { start: i, end: n }))
    }
  }
  $s.prototype.needsBoundaries = !0
  class Os extends _s {
    constructor() {
      super(...arguments), (this.hoistedDeclarations = [])
    }
    addDeclaration(e, t, s, i) {
      return this.hoistedDeclarations.push(e), this.parent.addDeclaration(e, t, s, i)
    }
  }
  const Vs = Symbol('unset')
  class Ds extends qe {
    constructor() {
      super(...arguments), (this.testValue = Vs)
    }
    deoptimizeCache() {
      this.testValue = H
    }
    hasEffects(e) {
      if (this.test.hasEffects(e)) return !0
      const t = this.getTestValue()
      if (t === H) {
        const { brokenFlow: t } = e
        if (this.consequent.hasEffects(e)) return !0
        const s = e.brokenFlow
        return (
          (e.brokenFlow = t),
          null !== this.alternate &&
            (!!this.alternate.hasEffects(e) ||
              ((e.brokenFlow = e.brokenFlow < s ? e.brokenFlow : s), !1))
        )
      }
      return t
        ? this.consequent.hasEffects(e)
        : null !== this.alternate && this.alternate.hasEffects(e)
    }
    include(e, t) {
      if (((this.included = !0), t)) this.includeRecursively(t, e)
      else {
        const t = this.getTestValue()
        t === H ? this.includeUnknownTest(e) : this.includeKnownTest(e, t)
      }
    }
    parseNode(e) {
      ;(this.consequentScope = new Os(this.scope)),
        (this.consequent = new (this.context.nodeConstructors[e.consequent.type] ||
          this.context.nodeConstructors.UnknownNode)(e.consequent, this, this.consequentScope)),
        e.alternate &&
          ((this.alternateScope = new Os(this.scope)),
          (this.alternate = new (this.context.nodeConstructors[e.alternate.type] ||
            this.context.nodeConstructors.UnknownNode)(e.alternate, this, this.alternateScope))),
        super.parseNode(e)
    }
    render(e, t) {
      const s = this.getTestValue(),
        i = [],
        n = this.test.included,
        r = !this.context.options.treeshake
      n ? this.test.render(e, t) : (S(this, e), e.remove(this.start, this.consequent.start)),
        this.consequent.included && (r || s === H || s)
          ? this.consequent.render(e, t)
          : (e.overwrite(this.consequent.start, this.consequent.end, n ? ';' : ''),
            i.push(...this.consequentScope.hoistedDeclarations)),
        this.alternate &&
          (!this.alternate.included || (!r && s !== H && s)
            ? (n && this.shouldKeepAlternateBranch()
                ? e.overwrite(this.alternate.start, this.end, ';')
                : e.remove(this.consequent.end, this.end),
              i.push(...this.alternateScope.hoistedDeclarations))
            : (n
                ? 101 === e.original.charCodeAt(this.alternate.start - 1) &&
                  e.prependLeft(this.alternate.start, ' ')
                : e.remove(this.consequent.end, this.alternate.start),
              this.alternate.render(e, t))),
        this.renderHoistedDeclarations(i, e)
    }
    getTestValue() {
      return this.testValue === Vs
        ? (this.testValue = this.test.getLiteralValueAtPath(B, j, this))
        : this.testValue
    }
    includeKnownTest(e, t) {
      this.test.shouldBeIncluded(e) && this.test.include(e, !1),
        t && this.consequent.shouldBeIncluded(e) && this.consequent.include(e, !1),
        null !== this.alternate &&
          !t &&
          this.alternate.shouldBeIncluded(e) &&
          this.alternate.include(e, !1)
    }
    includeRecursively(e, t) {
      this.test.include(t, e),
        this.consequent.include(t, e),
        null !== this.alternate && this.alternate.include(t, e)
    }
    includeUnknownTest(e) {
      this.test.include(e, !1)
      const { brokenFlow: t } = e
      let s = 0
      this.consequent.shouldBeIncluded(e) &&
        (this.consequent.include(e, !1), (s = e.brokenFlow), (e.brokenFlow = t)),
        null !== this.alternate &&
          this.alternate.shouldBeIncluded(e) &&
          (this.alternate.include(e, !1), (e.brokenFlow = e.brokenFlow < s ? e.brokenFlow : s))
    }
    renderHoistedDeclarations(e, t) {
      const s = [
        ...new Set(
          e.map((e) => {
            const t = e.variable
            return t.included ? t.getName() : ''
          })
        )
      ]
        .filter(Boolean)
        .join(', ')
      if (s) {
        const e = this.parent.type,
          i = 'Program' !== e && 'BlockStatement' !== e
        t.prependRight(this.start, `${i ? '{ ' : ''}var ${s}; `), i && t.appendLeft(this.end, ' }')
      }
    }
    shouldKeepAlternateBranch() {
      let e = this.parent
      do {
        if (e instanceof Ds && e.alternate) return !0
        if (e instanceof ks) return !1
        e = e.parent
      } while (e)
      return !1
    }
  }
  class Bs extends qe {
    bind() {}
    hasEffects() {
      return !1
    }
    initialise() {
      this.context.addImport(this)
    }
    render(e, t, s) {
      e.remove(s.start, s.end)
    }
  }
  Bs.prototype.needsBoundaries = !0
  const Fs = { amd: ['require'], cjs: ['require'], system: ['module'] },
    Ws = 'ROLLUP_ASSET_URL_',
    Us = 'ROLLUP_FILE_URL_',
    js = {
      amd: ['document', 'module', 'URL'],
      cjs: ['document', 'require', 'URL'],
      es: [],
      iife: ['document', 'URL'],
      system: ['module'],
      umd: ['document', 'require', 'URL']
    },
    zs = {
      amd: ['document', 'require', 'URL'],
      cjs: ['document', 'require', 'URL'],
      es: [],
      iife: ['document', 'URL'],
      system: ['module', 'URL'],
      umd: ['document', 'require', 'URL']
    },
    Gs = (e, t = 'URL') => `new ${t}(${e}).href`,
    Hs = (e) =>
      Gs(`'${e}', document.currentScript && document.currentScript.src || document.baseURI`),
    qs = (e) => (t, s) => {
      const i = e(s)
      return null === t ? `({ url: ${i} })` : 'url' === t ? i : 'undefined'
    },
    Ks = (e) =>
      `(document.currentScript && document.currentScript.src || new URL('${e}', document.baseURI).href)`,
    Xs = {
      amd: (e) => ('.' !== e[0] && (e = './' + e), Gs(`require.toUrl('${e}'), document.baseURI`)),
      cjs: (e) =>
        `(typeof document === 'undefined' ? ${Gs(`'file:' + __dirname + '/${e}'`, "(require('u' + 'rl').URL)")} : ${Hs(e)})`,
      es: (e) => Gs(`'${e}', import.meta.url`),
      iife: (e) => Hs(e),
      system: (e) => Gs(`'${e}', module.meta.url`),
      umd: (e) =>
        `(typeof document === 'undefined' ? ${Gs(`'file:' + __dirname + '/${e}'`, "(require('u' + 'rl').URL)")} : ${Hs(e)})`
    },
    Ys = {
      amd: qs(() => Gs('module.uri, document.baseURI')),
      cjs: qs(
        (e) =>
          `(typeof document === 'undefined' ? ${Gs("'file:' + __filename", "(require('u' + 'rl').URL)")} : ${Ks(e)})`
      ),
      iife: qs((e) => Ks(e)),
      system: (e) => (null === e ? 'module.meta' : 'module.meta.' + e),
      umd: qs(
        (e) =>
          `(typeof document === 'undefined' ? ${Gs("'file:' + __filename", "(require('u' + 'rl').URL)")} : ${Ks(e)})`
      )
    }
  class Qs extends qe {
    constructor() {
      super(...arguments), (this.hasCachedEffect = !1)
    }
    hasEffects(e) {
      if (this.hasCachedEffect) return !0
      for (const t of this.body) if (t.hasEffects(e)) return (this.hasCachedEffect = !0)
      return !1
    }
    include(e, t) {
      this.included = !0
      for (const s of this.body) (t || s.shouldBeIncluded(e)) && s.include(e, t)
    }
    render(e, t) {
      this.body.length ? P(this.body, e, this.start, this.end, t) : super.render(e, t)
    }
  }
  class Js extends qe {
    hasEffects(e) {
      if (this.test && this.test.hasEffects(e)) return !0
      for (const t of this.consequent) {
        if (e.brokenFlow) break
        if (t.hasEffects(e)) return !0
      }
      return !1
    }
    include(e, t) {
      ;(this.included = !0), this.test && this.test.include(e, t)
      for (const s of this.consequent) (t || s.shouldBeIncluded(e)) && s.include(e, t)
    }
    render(e, t, s) {
      if (this.consequent.length) {
        this.test && this.test.render(e, t)
        const i = this.test ? this.test.end : A(e.original, 'default', this.start) + 7,
          n = A(e.original, ':', i) + 1
        P(this.consequent, e, n, s.end, t)
      } else super.render(e, t)
    }
  }
  Js.prototype.needsBoundaries = !0
  class Zs extends qe {
    getLiteralValueAtPath(e) {
      return e.length > 0 || 1 !== this.quasis.length ? H : this.quasis[0].value.cooked
    }
    render(e, t) {
      e.indentExclusionRanges.push([this.start, this.end]), super.render(e, t)
    }
  }
  class ei extends ze {
    constructor(e, t) {
      super(e), (this.context = t), this.variables.set('this', new Ue('this', null, K, t))
    }
    addExportDefaultDeclaration(e, t, s) {
      const i = new _t(e, t, s)
      return this.variables.set('default', i), i
    }
    addNamespaceMemberAccess() {}
    deconflict(e, t, s) {
      for (const i of this.children) i.deconflict(e, t, s)
    }
    findLexicalBoundary() {
      return this
    }
    findVariable(e) {
      const t = this.variables.get(e) || this.accessedOutsideVariables.get(e)
      if (t) return t
      const s = this.context.traceVariable(e) || this.parent.findVariable(e)
      return s instanceof gt && this.accessedOutsideVariables.set(e, s), s
    }
  }
  const ti = {
    '!': (e) => !e,
    '+': (e) => +e,
    '-': (e) => -e,
    delete: () => H,
    typeof: (e) => typeof e,
    void: () => {},
    '~': (e) => ~e
  }
  function si(e, t) {
    return null !== e.renderBaseName && t.has(e) && e.isReassigned
  }
  class ii extends qe {
    deoptimizePath() {
      for (const e of this.declarations) e.deoptimizePath(B)
    }
    hasEffectsWhenAssignedAtPath() {
      return !1
    }
    include(e, t) {
      this.included = !0
      for (const s of this.declarations) (t || s.shouldBeIncluded(e)) && s.include(e, t)
    }
    includeWithAllDeclaredVariables(e, t) {
      this.included = !0
      for (const s of this.declarations) s.include(t, e)
    }
    initialise() {
      for (const e of this.declarations) e.declareDeclarator(this.kind)
    }
    render(e, t, s = st) {
      if (
        (function (e, t) {
          for (const s of e) {
            if (!s.included) return !1
            if ('Identifier' === s.id.type) {
              if (t.has(s.id.variable)) return !1
            } else {
              const e = []
              if ((s.id.addExportedVariables(e, t), e.length > 0)) return !1
            }
          }
          return !0
        })(this.declarations, t.exportNamesByVariable)
      ) {
        for (const s of this.declarations) s.render(e, t)
        s.isNoStatement || 59 === e.original.charCodeAt(this.end - 1) || e.appendLeft(this.end, ';')
      } else this.renderReplacedDeclarations(e, t, s)
    }
    renderDeclarationEnd(e, t, s, i, n, r, a, o) {
      59 === e.original.charCodeAt(this.end - 1) && e.remove(this.end - 1, this.end),
        r && (t += ';'),
        null !== s
          ? (10 !== e.original.charCodeAt(i - 1) ||
              (10 !== e.original.charCodeAt(this.end) && 13 !== e.original.charCodeAt(this.end)) ||
              (i--, 13 === e.original.charCodeAt(i) && i--),
            i === s + 1 ? e.overwrite(s, n, t) : (e.overwrite(s, s + 1, t), e.remove(i, n)))
          : e.appendLeft(n, t),
        a.length > 0 && e.appendLeft(n, ` ${T(a, o)};`)
    }
    renderReplacedDeclarations(
      e,
      t,
      { start: s = this.start, end: i = this.end, isNoStatement: n }
    ) {
      const r = I(
        this.declarations,
        e,
        this.start + this.kind.length,
        this.end - (59 === e.original.charCodeAt(this.end - 1) ? 1 : 0)
      )
      let a, o
      o = /\n\s*$/.test(e.slice(this.start, r[0].start))
        ? this.start + this.kind.length
        : r[0].start
      let h = o - 1
      e.remove(this.start, h)
      let l,
        c,
        u = !1,
        p = !1,
        d = ''
      const f = []
      for (const { node: s, start: i, separator: n, contentEnd: m, end: g } of r)
        if (
          !s.included ||
          (s.id instanceof yt && si(s.id.variable, t.exportNamesByVariable) && null === s.init)
        )
          e.remove(i, g)
        else {
          if (
            ((l = ''), (c = ''), s.id instanceof yt && si(s.id.variable, t.exportNamesByVariable))
          )
            p && (d += ';'), (u = !1)
          else {
            if ('system' === t.format && null !== s.init)
              if ('Identifier' !== s.id.type) s.id.addExportedVariables(f, t.exportNamesByVariable)
              else {
                const i = t.exportNamesByVariable.get(s.id.variable)
                if (i) {
                  const n = t.compact ? '' : ' ',
                    r = A(e.original, '=', s.id.end)
                  e.prependLeft(
                    C(e.original, r + 1),
                    1 === i.length ? `exports('${i[0]}',${n}` : L([s.id.variable], !1, t)
                  ),
                    (c += ')')
                }
              }
            u ? (d += ',') : (p && (d += ';'), (l += this.kind + ' '), (u = !0))
          }
          o === h + 1 ? e.overwrite(h, o, d + l) : (e.overwrite(h, h + 1, d), e.appendLeft(o, l)),
            s.render(e, t),
            (a = m),
            (o = g),
            (p = !0),
            (h = n),
            (d = c)
        }
      p ? this.renderDeclarationEnd(e, d, h, a, o, !n, f, t) : e.remove(s, i)
    }
  }
  const ni = {
    ArrayExpression: class extends qe {
      bind() {
        super.bind()
        for (const e of this.elements) null !== e && e.deoptimizePath(F)
      }
      getReturnExpressionWhenCalledAtPath(e) {
        return 1 !== e.length ? q : ve(fe, e[0])
      }
      hasEffectsWhenAccessedAtPath(e) {
        return e.length > 1
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        return 1 !== e.length || xe(fe, e[0], this.included, t, s)
      }
    },
    ArrayPattern: class extends qe {
      addExportedVariables(e, t) {
        for (const s of this.elements) null !== s && s.addExportedVariables(e, t)
      }
      declare(e) {
        const t = []
        for (const s of this.elements) null !== s && t.push(...s.declare(e, q))
        return t
      }
      deoptimizePath(e) {
        if (0 === e.length) for (const t of this.elements) null !== t && t.deoptimizePath(e)
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        if (e.length > 0) return !0
        for (const e of this.elements)
          if (null !== e && e.hasEffectsWhenAssignedAtPath(B, t)) return !0
        return !1
      }
    },
    ArrowFunctionExpression: Cs,
    AssignmentExpression: class extends qe {
      constructor() {
        super(...arguments), (this.deoptimized = !1)
      }
      hasEffects(e) {
        return (
          this.deoptimized || this.applyDeoptimizations(),
          this.right.hasEffects(e) ||
            this.left.hasEffects(e) ||
            this.left.hasEffectsWhenAssignedAtPath(B, e)
        )
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        return e.length > 0 && this.right.hasEffectsWhenAccessedAtPath(e, t)
      }
      include(e, t) {
        this.deoptimized || this.applyDeoptimizations(),
          (this.included = !0),
          this.left.include(e, t),
          this.right.include(e, t)
      }
      render(e, t) {
        if ((this.left.render(e, t), this.right.render(e, t), 'system' === t.format)) {
          const s = this.left.variable && t.exportNamesByVariable.get(this.left.variable)
          if ('Identifier' === this.left.type && s) {
            const i = t.compact ? '' : ' ',
              n = A(e.original, this.operator, this.left.end),
              r = this.operator.length > 1 ? `${s[0]}${i}${this.operator.slice(0, -1)}${i}` : ''
            e.overwrite(
              n,
              C(e.original, n + this.operator.length),
              `=${i}${1 === s.length ? `exports('${s[0]}',${i}` : L([this.left.variable], !1, t)}${r}`
            ),
              e.appendLeft(this.right.end, ')')
          } else {
            const s = []
            this.left.addExportedVariables(s, t.exportNamesByVariable),
              s.length > 0 && (e.prependRight(this.start, L(s, !0, t)), e.appendLeft(this.end, ')'))
          }
        }
      }
      applyDeoptimizations() {
        ;(this.deoptimized = !0), this.left.deoptimizePath(B), this.right.deoptimizePath(F)
      }
    },
    AssignmentPattern: class extends qe {
      addExportedVariables(e, t) {
        this.left.addExportedVariables(e, t)
      }
      bind() {
        super.bind(), this.left.deoptimizePath(B), this.right.deoptimizePath(F)
      }
      declare(e, t) {
        return this.left.declare(e, t)
      }
      deoptimizePath(e) {
        0 === e.length && this.left.deoptimizePath(e)
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        return e.length > 0 || this.left.hasEffectsWhenAssignedAtPath(B, t)
      }
      render(e, t, { isShorthandProperty: s } = st) {
        this.left.render(e, t, { isShorthandProperty: s }), this.right.render(e, t)
      }
    },
    AwaitExpression: class extends qe {
      hasEffects(e) {
        return !e.ignore.returnAwaitYield || this.argument.hasEffects(e)
      }
      include(e, t) {
        if (!this.included) {
          this.included = !0
          e: if (!this.context.usesTopLevelAwait) {
            let e = this.parent
            do {
              if (e instanceof vt || e instanceof Cs) break e
            } while ((e = e.parent))
            this.context.usesTopLevelAwait = !0
          }
        }
        this.argument.include(e, t)
      }
    },
    BinaryExpression: class extends qe {
      deoptimizeCache() {}
      getLiteralValueAtPath(e, t, s) {
        if (e.length > 0) return H
        const i = this.left.getLiteralValueAtPath(B, t, s)
        if (i === H) return H
        const n = this.right.getLiteralValueAtPath(B, t, s)
        if (n === H) return H
        const r = ws[this.operator]
        return r ? r(i, n) : H
      }
      hasEffects(e) {
        return (
          ('+' === this.operator &&
            this.parent instanceof As &&
            '' === this.left.getLiteralValueAtPath(B, j, this)) ||
          super.hasEffects(e)
        )
      }
      hasEffectsWhenAccessedAtPath(e) {
        return e.length > 1
      }
    },
    BlockStatement: ks,
    BreakStatement: class extends qe {
      hasEffects(e) {
        if (this.label) {
          if (!e.ignore.labels.has(this.label.name)) return !0
          e.includedLabels.add(this.label.name), (e.brokenFlow = 2)
        } else {
          if (!e.ignore.breaks) return !0
          e.brokenFlow = 1
        }
        return !1
      }
      include(e) {
        ;(this.included = !0),
          this.label && (this.label.include(), e.includedLabels.add(this.label.name)),
          (e.brokenFlow = this.label ? 2 : 1)
      }
    },
    CallExpression: class extends qe {
      constructor() {
        super(...arguments),
          (this.expressionsToBeDeoptimized = []),
          (this.returnExpression = null),
          (this.wasPathDeoptmizedWhileOptimized = !1)
      }
      bind() {
        super.bind(),
          this.callee instanceof yt &&
            (this.scope.findVariable(this.callee.name).isNamespace &&
              this.context.warn(
                {
                  code: 'CANNOT_CALL_NAMESPACE',
                  message: `Cannot call a namespace ('${this.callee.name}')`
                },
                this.start
              ),
            'eval' === this.callee.name &&
              this.context.warn(
                {
                  code: 'EVAL',
                  message:
                    'Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification',
                  url: 'https://rollupjs.org/guide/en/#avoiding-eval'
                },
                this.start
              )),
          this.getReturnExpression(j),
          this.callee instanceof Is && !this.callee.variable && this.callee.object.deoptimizePath(F)
        for (const e of this.arguments) e.deoptimizePath(F)
      }
      deoptimizeCache() {
        if (this.returnExpression !== q) {
          this.returnExpression = null
          const e = this.getReturnExpression(j),
            t = this.expressionsToBeDeoptimized
          e !== q &&
            ((this.expressionsToBeDeoptimized = []),
            this.wasPathDeoptmizedWhileOptimized &&
              (e.deoptimizePath(F), (this.wasPathDeoptmizedWhileOptimized = !1)))
          for (const e of t) e.deoptimizeCache()
        }
      }
      deoptimizePath(e) {
        if (0 === e.length) return
        const t = this.context.deoptimizationTracker.getEntities(e)
        if (t.has(this)) return
        t.add(this)
        const s = this.getReturnExpression(j)
        s !== q && ((this.wasPathDeoptmizedWhileOptimized = !0), s.deoptimizePath(e))
      }
      getLiteralValueAtPath(e, t, s) {
        const i = this.getReturnExpression(t)
        if (i === q) return H
        const n = t.getEntities(e)
        if (n.has(i)) return H
        this.expressionsToBeDeoptimized.push(s), n.add(i)
        const r = i.getLiteralValueAtPath(e, t, s)
        return n.delete(i), r
      }
      getReturnExpressionWhenCalledAtPath(e, t, s) {
        const i = this.getReturnExpression(t)
        if (this.returnExpression === q) return q
        const n = t.getEntities(e)
        if (n.has(i)) return q
        this.expressionsToBeDeoptimized.push(s), n.add(i)
        const r = i.getReturnExpressionWhenCalledAtPath(e, t, s)
        return n.delete(i), r
      }
      hasEffects(e) {
        for (const t of this.arguments) if (t.hasEffects(e)) return !0
        return (
          (!this.context.options.treeshake.annotations || !this.annotatedPure) &&
          (this.callee.hasEffects(e) ||
            this.callee.hasEffectsWhenCalledAtPath(B, this.callOptions, e))
        )
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        if (0 === e.length) return !1
        const s = t.accessed.getEntities(e)
        return (
          !s.has(this) && (s.add(this), this.returnExpression.hasEffectsWhenAccessedAtPath(e, t))
        )
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        if (0 === e.length) return !0
        const s = t.assigned.getEntities(e)
        return (
          !s.has(this) && (s.add(this), this.returnExpression.hasEffectsWhenAssignedAtPath(e, t))
        )
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        const i = (t.withNew ? s.instantiated : s.called).getEntities(e, t)
        return (
          !i.has(this) && (i.add(this), this.returnExpression.hasEffectsWhenCalledAtPath(e, t, s))
        )
      }
      include(e, t) {
        t
          ? (super.include(e, t),
            'variables' === t &&
              this.callee instanceof yt &&
              this.callee.variable &&
              this.callee.variable.markCalledFromTryStatement())
          : ((this.included = !0), this.callee.include(e, !1)),
          this.callee.includeCallArguments(e, this.arguments),
          this.returnExpression.included || this.returnExpression.include(e, !1)
      }
      initialise() {
        this.callOptions = { args: this.arguments, withNew: !1 }
      }
      render(e, t, { renderedParentType: s } = st) {
        if ((this.callee.render(e, t), this.arguments.length > 0))
          if (this.arguments[this.arguments.length - 1].included)
            for (const s of this.arguments) s.render(e, t)
          else {
            let s = this.arguments.length - 2
            for (; s >= 0 && !this.arguments[s].included; ) s--
            if (s >= 0) {
              for (let i = 0; i <= s; i++) this.arguments[i].render(e, t)
              e.remove(A(e.original, ',', this.arguments[s].end), this.end - 1)
            } else e.remove(A(e.original, '(', this.callee.end) + 1, this.end - 1)
          }
        'ExpressionStatement' === s &&
          'FunctionExpression' === this.callee.type &&
          (e.appendRight(this.start, '('), e.prependLeft(this.end, ')'))
      }
      getReturnExpression(e) {
        return null === this.returnExpression
          ? ((this.returnExpression = q),
            (this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(B, e, this)))
          : this.returnExpression
      }
    },
    CatchClause: Ts,
    ChainExpression: class extends qe {},
    ClassBody: class extends qe {
      createScope(e) {
        this.scope = new Ls(e)
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        return (
          e.length > 0 ||
          (null !== this.classConstructor &&
            this.classConstructor.hasEffectsWhenCalledAtPath(B, t, s))
        )
      }
      initialise() {
        for (const e of this.body)
          if (e instanceof Ms && 'constructor' === e.kind) return void (this.classConstructor = e)
        this.classConstructor = null
      }
    },
    ClassDeclaration: Xe,
    ClassExpression: class extends Ke {},
    ConditionalExpression: class extends qe {
      constructor() {
        super(...arguments),
          (this.expressionsToBeDeoptimized = []),
          (this.isBranchResolutionAnalysed = !1),
          (this.usedBranch = null),
          (this.wasPathDeoptimizedWhileOptimized = !1)
      }
      bind() {
        super.bind(), this.getUsedBranch()
      }
      deoptimizeCache() {
        if (null !== this.usedBranch) {
          const e = this.usedBranch === this.consequent ? this.alternate : this.consequent
          this.usedBranch = null
          const t = this.expressionsToBeDeoptimized
          ;(this.expressionsToBeDeoptimized = []),
            this.wasPathDeoptimizedWhileOptimized && e.deoptimizePath(F)
          for (const e of t) e.deoptimizeCache()
        }
      }
      deoptimizePath(e) {
        if (e.length > 0) {
          const t = this.getUsedBranch()
          null === t
            ? (this.consequent.deoptimizePath(e), this.alternate.deoptimizePath(e))
            : ((this.wasPathDeoptimizedWhileOptimized = !0), t.deoptimizePath(e))
        }
      }
      getLiteralValueAtPath(e, t, s) {
        const i = this.getUsedBranch()
        return null === i
          ? H
          : (this.expressionsToBeDeoptimized.push(s), i.getLiteralValueAtPath(e, t, s))
      }
      getReturnExpressionWhenCalledAtPath(e, t, s) {
        const i = this.getUsedBranch()
        return null === i
          ? new Rs([
              this.consequent.getReturnExpressionWhenCalledAtPath(e, t, s),
              this.alternate.getReturnExpressionWhenCalledAtPath(e, t, s)
            ])
          : (this.expressionsToBeDeoptimized.push(s),
            i.getReturnExpressionWhenCalledAtPath(e, t, s))
      }
      hasEffects(e) {
        return (
          !!this.test.hasEffects(e) ||
          (null === this.usedBranch
            ? this.consequent.hasEffects(e) || this.alternate.hasEffects(e)
            : this.usedBranch.hasEffects(e))
        )
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        return (
          0 !== e.length &&
          (null === this.usedBranch
            ? this.consequent.hasEffectsWhenAccessedAtPath(e, t) ||
              this.alternate.hasEffectsWhenAccessedAtPath(e, t)
            : this.usedBranch.hasEffectsWhenAccessedAtPath(e, t))
        )
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        return (
          0 === e.length ||
          (null === this.usedBranch
            ? this.consequent.hasEffectsWhenAssignedAtPath(e, t) ||
              this.alternate.hasEffectsWhenAssignedAtPath(e, t)
            : this.usedBranch.hasEffectsWhenAssignedAtPath(e, t))
        )
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        return null === this.usedBranch
          ? this.consequent.hasEffectsWhenCalledAtPath(e, t, s) ||
              this.alternate.hasEffectsWhenCalledAtPath(e, t, s)
          : this.usedBranch.hasEffectsWhenCalledAtPath(e, t, s)
      }
      include(e, t) {
        ;(this.included = !0),
          t || this.test.shouldBeIncluded(e) || null === this.usedBranch
            ? (this.test.include(e, t), this.consequent.include(e, t), this.alternate.include(e, t))
            : this.usedBranch.include(e, t)
      }
      includeCallArguments(e, t) {
        null === this.usedBranch
          ? (this.consequent.includeCallArguments(e, t), this.alternate.includeCallArguments(e, t))
          : this.usedBranch.includeCallArguments(e, t)
      }
      render(e, t, { renderedParentType: s, isCalleeOfRenderedParent: i, preventASI: n } = st) {
        if (this.test.included) super.render(e, t)
        else {
          const r = A(e.original, ':', this.consequent.end),
            a = (this.consequent.included ? A(e.original, '?', this.test.end) : r) + 1
          n && N(e, a, this.usedBranch.start),
            e.remove(this.start, a),
            this.consequent.included && e.remove(r, this.end),
            S(this, e),
            this.usedBranch.render(e, t, {
              isCalleeOfRenderedParent: s ? i : this.parent.callee === this,
              preventASI: !0,
              renderedParentType: s || this.parent.type
            })
        }
      }
      getUsedBranch() {
        if (this.isBranchResolutionAnalysed) return this.usedBranch
        this.isBranchResolutionAnalysed = !0
        const e = this.test.getLiteralValueAtPath(B, j, this)
        return e === H ? null : (this.usedBranch = e ? this.consequent : this.alternate)
      }
    },
    ContinueStatement: class extends qe {
      hasEffects(e) {
        if (this.label) {
          if (!e.ignore.labels.has(this.label.name)) return !0
          e.includedLabels.add(this.label.name), (e.brokenFlow = 2)
        } else {
          if (!e.ignore.continues) return !0
          e.brokenFlow = 1
        }
        return !1
      }
      include(e) {
        ;(this.included = !0),
          this.label && (this.label.include(), e.includedLabels.add(this.label.name)),
          (e.brokenFlow = this.label ? 2 : 1)
      }
    },
    DoWhileStatement: class extends qe {
      hasEffects(e) {
        if (this.test.hasEffects(e)) return !0
        const {
          brokenFlow: t,
          ignore: { breaks: s, continues: i }
        } = e
        return (
          (e.ignore.breaks = !0),
          (e.ignore.continues = !0),
          !!this.body.hasEffects(e) ||
            ((e.ignore.breaks = s), (e.ignore.continues = i), (e.brokenFlow = t), !1)
        )
      }
      include(e, t) {
        ;(this.included = !0), this.test.include(e, t)
        const { brokenFlow: s } = e
        this.body.include(e, t), (e.brokenFlow = s)
      }
    },
    EmptyStatement: class extends qe {
      hasEffects() {
        return !1
      }
    },
    ExportAllDeclaration: Ss,
    ExportDefaultDeclaration: bt,
    ExportNamedDeclaration: $s,
    ExportSpecifier: class extends qe {},
    ExpressionStatement: As,
    FieldDefinition: class extends qe {
      hasEffects(e) {
        return (
          this.key.hasEffects(e) || (this.static && null !== this.value && this.value.hasEffects(e))
        )
      }
    },
    ForInStatement: class extends qe {
      bind() {
        this.left.bind(), this.left.deoptimizePath(B), this.right.bind(), this.body.bind()
      }
      createScope(e) {
        this.scope = new _s(e)
      }
      hasEffects(e) {
        if (
          (this.left &&
            (this.left.hasEffects(e) || this.left.hasEffectsWhenAssignedAtPath(B, e))) ||
          (this.right && this.right.hasEffects(e))
        )
          return !0
        const {
          brokenFlow: t,
          ignore: { breaks: s, continues: i }
        } = e
        return (
          (e.ignore.breaks = !0),
          (e.ignore.continues = !0),
          !!this.body.hasEffects(e) ||
            ((e.ignore.breaks = s), (e.ignore.continues = i), (e.brokenFlow = t), !1)
        )
      }
      include(e, t) {
        ;(this.included = !0),
          this.left.includeWithAllDeclaredVariables(t, e),
          this.left.deoptimizePath(B),
          this.right.include(e, t)
        const { brokenFlow: s } = e
        this.body.include(e, t), (e.brokenFlow = s)
      }
      render(e, t) {
        this.left.render(e, t, _),
          this.right.render(e, t, _),
          110 === e.original.charCodeAt(this.right.start - 1) &&
            e.prependLeft(this.right.start, ' '),
          this.body.render(e, t)
      }
    },
    ForOfStatement: class extends qe {
      bind() {
        this.left.bind(), this.left.deoptimizePath(B), this.right.bind(), this.body.bind()
      }
      createScope(e) {
        this.scope = new _s(e)
      }
      hasEffects() {
        return !0
      }
      include(e, t) {
        ;(this.included = !0),
          this.left.includeWithAllDeclaredVariables(t, e),
          this.left.deoptimizePath(B),
          this.right.include(e, t)
        const { brokenFlow: s } = e
        this.body.include(e, t), (e.brokenFlow = s)
      }
      render(e, t) {
        this.left.render(e, t, _),
          this.right.render(e, t, _),
          102 === e.original.charCodeAt(this.right.start - 1) &&
            e.prependLeft(this.right.start, ' '),
          this.body.render(e, t)
      }
    },
    ForStatement: class extends qe {
      createScope(e) {
        this.scope = new _s(e)
      }
      hasEffects(e) {
        if (
          (this.init && this.init.hasEffects(e)) ||
          (this.test && this.test.hasEffects(e)) ||
          (this.update && this.update.hasEffects(e))
        )
          return !0
        const {
          brokenFlow: t,
          ignore: { breaks: s, continues: i }
        } = e
        return (
          (e.ignore.breaks = !0),
          (e.ignore.continues = !0),
          !!this.body.hasEffects(e) ||
            ((e.ignore.breaks = s), (e.ignore.continues = i), (e.brokenFlow = t), !1)
        )
      }
      include(e, t) {
        ;(this.included = !0),
          this.init && this.init.include(e, t),
          this.test && this.test.include(e, t)
        const { brokenFlow: s } = e
        this.update && this.update.include(e, t), this.body.include(e, t), (e.brokenFlow = s)
      }
      render(e, t) {
        this.init && this.init.render(e, t, _),
          this.test && this.test.render(e, t, _),
          this.update && this.update.render(e, t, _),
          this.body.render(e, t)
      }
    },
    FunctionDeclaration: Et,
    FunctionExpression: class extends vt {},
    Identifier: yt,
    IfStatement: Ds,
    ImportDeclaration: Bs,
    ImportDefaultSpecifier: class extends qe {},
    ImportExpression: class extends qe {
      constructor() {
        super(...arguments),
          (this.inlineNamespace = null),
          (this.mechanism = null),
          (this.resolution = null)
      }
      hasEffects() {
        return !0
      }
      include(e, t) {
        this.included ||
          ((this.included = !0),
          this.context.includeDynamicImport(this),
          this.scope.addAccessedDynamicImport(this)),
          this.source.include(e, t)
      }
      initialise() {
        this.context.addDynamicImport(this)
      }
      render(e, t) {
        if (this.inlineNamespace) {
          const s = t.compact ? '' : ' ',
            i = t.compact ? '' : ';'
          e.overwrite(
            this.start,
            this.end,
            `Promise.resolve().then(function${s}()${s}{${s}return ${this.inlineNamespace.getName()}${i}${s}})`
          )
        } else
          this.mechanism &&
            (e.overwrite(this.start, A(e.original, '(', this.start + 6) + 1, this.mechanism.left),
            e.overwrite(this.end - 1, this.end, this.mechanism.right)),
            this.source.render(e, t)
      }
      renderFinalResolution(e, t, s, i) {
        if ((e.overwrite(this.source.start, this.source.end, t), s)) {
          const t = i.compact ? '' : ' ',
            n = i.compact ? '' : ';'
          e.prependLeft(this.end, `.then(function${t}(n)${t}{${t}return n.${s}${n}${t}})`)
        }
      }
      setExternalResolution(e, t, s, i, n) {
        this.resolution = t
        const r = [...(Fs[s.format] || [])]
        let a
        ;({ helper: a, mechanism: this.mechanism } = this.getDynamicImportMechanismAndHelper(
          t,
          e,
          s,
          i
        )),
          a && r.push(a),
          r.length > 0 && this.scope.addAccessedGlobals(r, n)
      }
      setInternalResolution(e) {
        this.inlineNamespace = e
      }
      getDynamicImportMechanismAndHelper(e, t, s, i) {
        const n = i.hookFirstSync('renderDynamicImport', [
          {
            customResolution: 'string' == typeof this.resolution ? this.resolution : null,
            format: s.format,
            moduleId: this.context.module.id,
            targetModuleId:
              this.resolution && 'string' != typeof this.resolution ? this.resolution.id : null
          }
        ])
        if (n) return { helper: null, mechanism: n }
        switch (s.format) {
          case 'cjs': {
            const i = s.compact ? '' : ' ',
              n = s.compact ? '' : ';',
              r = `Promise.resolve().then(function${i}()${i}{${i}return`,
              a = this.getInteropHelper(e, t, s.interop)
            return {
              helper: a,
              mechanism: a
                ? { left: `${r} /*#__PURE__*/${a}(require(`, right: `))${n}${i}})` }
                : { left: r + ' require(', right: `)${n}${i}})` }
            }
          }
          case 'amd': {
            const i = s.compact ? '' : ' ',
              n = s.compact ? 'c' : 'resolve',
              r = s.compact ? 'e' : 'reject',
              a = this.getInteropHelper(e, t, s.interop)
            return {
              helper: a,
              mechanism: {
                left: `new Promise(function${i}(${n},${i}${r})${i}{${i}require([`,
                right: `],${i}${a ? `function${i}(m)${i}{${i}${n}(/*#__PURE__*/${a}(m));${i}}` : n},${i}${r})${i}})`
              }
            }
          }
          case 'system':
            return { helper: null, mechanism: { left: 'module.import(', right: ')' } }
          case 'es':
            if (s.dynamicImportFunction)
              return {
                helper: null,
                mechanism: { left: s.dynamicImportFunction + '(', right: ')' }
              }
        }
        return { helper: null, mechanism: null }
      }
      getInteropHelper(e, t, s) {
        return 'external' === t
          ? Lt[String(s(e instanceof De ? e.id : null))]
          : 'default' === t
            ? '_interopNamespaceDefaultOnly'
            : null
      }
    },
    ImportNamespaceSpecifier: class extends qe {},
    ImportSpecifier: class extends qe {},
    LabeledStatement: class extends qe {
      hasEffects(e) {
        const t = e.brokenFlow
        return (
          e.ignore.labels.add(this.label.name),
          !!this.body.hasEffects(e) ||
            (e.ignore.labels.delete(this.label.name),
            e.includedLabels.has(this.label.name) &&
              (e.includedLabels.delete(this.label.name), (e.brokenFlow = t)),
            !1)
        )
      }
      include(e, t) {
        this.included = !0
        const s = e.brokenFlow
        this.body.include(e, t),
          (t || e.includedLabels.has(this.label.name)) &&
            (this.label.include(), e.includedLabels.delete(this.label.name), (e.brokenFlow = s))
      }
      render(e, t) {
        this.label.included
          ? this.label.render(e, t)
          : e.remove(this.start, A(e.original, ':', this.label.end) + 1),
          this.body.render(e, t)
      }
    },
    Literal: Ps,
    LogicalExpression: class extends qe {
      constructor() {
        super(...arguments),
          (this.expressionsToBeDeoptimized = []),
          (this.isBranchResolutionAnalysed = !1),
          (this.unusedBranch = null),
          (this.usedBranch = null),
          (this.wasPathDeoptimizedWhileOptimized = !1)
      }
      bind() {
        super.bind(), this.getUsedBranch()
      }
      deoptimizeCache() {
        if (null !== this.usedBranch) {
          this.usedBranch = null
          const e = this.expressionsToBeDeoptimized
          ;(this.expressionsToBeDeoptimized = []),
            this.wasPathDeoptimizedWhileOptimized && this.unusedBranch.deoptimizePath(F)
          for (const t of e) t.deoptimizeCache()
        }
      }
      deoptimizePath(e) {
        const t = this.getUsedBranch()
        null === t
          ? (this.left.deoptimizePath(e), this.right.deoptimizePath(e))
          : ((this.wasPathDeoptimizedWhileOptimized = !0), t.deoptimizePath(e))
      }
      getLiteralValueAtPath(e, t, s) {
        const i = this.getUsedBranch()
        return null === i
          ? H
          : (this.expressionsToBeDeoptimized.push(s), i.getLiteralValueAtPath(e, t, s))
      }
      getReturnExpressionWhenCalledAtPath(e, t, s) {
        const i = this.getUsedBranch()
        return null === i
          ? new Rs([
              this.left.getReturnExpressionWhenCalledAtPath(e, t, s),
              this.right.getReturnExpressionWhenCalledAtPath(e, t, s)
            ])
          : (this.expressionsToBeDeoptimized.push(s),
            i.getReturnExpressionWhenCalledAtPath(e, t, s))
      }
      hasEffects(e) {
        return (
          !!this.left.hasEffects(e) || (this.usedBranch !== this.left && this.right.hasEffects(e))
        )
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        return (
          0 !== e.length &&
          (null === this.usedBranch
            ? this.left.hasEffectsWhenAccessedAtPath(e, t) ||
              this.right.hasEffectsWhenAccessedAtPath(e, t)
            : this.usedBranch.hasEffectsWhenAccessedAtPath(e, t))
        )
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        return (
          0 === e.length ||
          (null === this.usedBranch
            ? this.left.hasEffectsWhenAssignedAtPath(e, t) ||
              this.right.hasEffectsWhenAssignedAtPath(e, t)
            : this.usedBranch.hasEffectsWhenAssignedAtPath(e, t))
        )
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        return null === this.usedBranch
          ? this.left.hasEffectsWhenCalledAtPath(e, t, s) ||
              this.right.hasEffectsWhenCalledAtPath(e, t, s)
          : this.usedBranch.hasEffectsWhenCalledAtPath(e, t, s)
      }
      include(e, t) {
        ;(this.included = !0),
          t ||
          (this.usedBranch === this.right && this.left.shouldBeIncluded(e)) ||
          null === this.usedBranch
            ? (this.left.include(e, t), this.right.include(e, t))
            : this.usedBranch.include(e, t)
      }
      render(e, t, { renderedParentType: s, isCalleeOfRenderedParent: i, preventASI: n } = st) {
        if (this.left.included && this.right.included)
          this.left.render(e, t, { preventASI: n }), this.right.render(e, t)
        else {
          const r = A(e.original, this.operator, this.left.end)
          this.right.included
            ? (e.remove(this.start, r + 2), n && N(e, r + 2, this.right.start))
            : e.remove(r, this.end),
            S(this, e),
            this.usedBranch.render(e, t, {
              isCalleeOfRenderedParent: s ? i : this.parent.callee === this,
              preventASI: n,
              renderedParentType: s || this.parent.type
            })
        }
      }
      getUsedBranch() {
        if (!this.isBranchResolutionAnalysed) {
          this.isBranchResolutionAnalysed = !0
          const e = this.left.getLiteralValueAtPath(B, j, this)
          if (e === H) return null
          ;('||' === this.operator && e) ||
          ('&&' === this.operator && !e) ||
          ('??' === this.operator && null != e)
            ? ((this.usedBranch = this.left), (this.unusedBranch = this.right))
            : ((this.usedBranch = this.right), (this.unusedBranch = this.left))
        }
        return this.usedBranch
      }
    },
    MemberExpression: Is,
    MetaProperty: class extends qe {
      addAccessedGlobals(e, t) {
        const s = this.metaProperty,
          i = (
            s && (s.startsWith(Us) || s.startsWith(Ws) || s.startsWith('ROLLUP_CHUNK_URL_'))
              ? zs
              : js
          )[e]
        i.length > 0 && this.scope.addAccessedGlobals(i, t)
      }
      getReferencedFileName(e) {
        const t = this.metaProperty
        return t && t.startsWith(Us) ? e.getFileName(t.substr(Us.length)) : null
      }
      hasEffects() {
        return !1
      }
      hasEffectsWhenAccessedAtPath(e) {
        return e.length > 1
      }
      include() {
        if (!this.included && ((this.included = !0), 'import' === this.meta.name)) {
          this.context.addImportMeta(this)
          const e = this.parent
          this.metaProperty =
            e instanceof Is && 'string' == typeof e.propertyKey ? e.propertyKey : null
        }
      }
      renderFinalMechanism(e, t, s, i) {
        var n
        const r = this.parent,
          a = this.metaProperty
        if (a && (a.startsWith(Us) || a.startsWith(Ws) || a.startsWith('ROLLUP_CHUNK_URL_'))) {
          let n,
            o = null,
            h = null,
            l = null
          a.startsWith(Us)
            ? ((o = a.substr(Us.length)), (n = i.getFileName(o)))
            : a.startsWith(Ws)
              ? (hs(
                  `Using the "${Ws}" prefix to reference files is deprecated. Use the "${Us}" prefix instead.`,
                  !0,
                  this.context.options
                ),
                (h = a.substr(Ws.length)),
                (n = i.getFileName(h)))
              : (hs(
                  `Using the "ROLLUP_CHUNK_URL_" prefix to reference files is deprecated. Use the "${Us}" prefix instead.`,
                  !0,
                  this.context.options
                ),
                (l = a.substr('ROLLUP_CHUNK_URL_'.length)),
                (n = i.getFileName(l)))
          const c = Le(Oe(Re(t), n))
          let u
          return (
            null !== h &&
              (u = i.hookFirstSync('resolveAssetUrl', [
                {
                  assetFileName: n,
                  chunkId: t,
                  format: s,
                  moduleId: this.context.module.id,
                  relativeAssetPath: c
                }
              ])),
            u ||
              (u =
                i.hookFirstSync('resolveFileUrl', [
                  {
                    assetReferenceId: h,
                    chunkId: t,
                    chunkReferenceId: l,
                    fileName: n,
                    format: s,
                    moduleId: this.context.module.id,
                    referenceId: o || h || l,
                    relativePath: c
                  }
                ]) || Xs[s](c)),
            void e.overwrite(r.start, r.end, u, { contentOnly: !0 })
          )
        }
        const o =
          i.hookFirstSync('resolveImportMeta', [
            a,
            { chunkId: t, format: s, moduleId: this.context.module.id }
          ]) || (null === (n = Ys[s]) || void 0 === n ? void 0 : n.call(Ys, a, t))
        'string' == typeof o &&
          (r instanceof Is
            ? e.overwrite(r.start, r.end, o, { contentOnly: !0 })
            : e.overwrite(this.start, this.end, o, { contentOnly: !0 }))
      }
    },
    MethodDefinition: Ms,
    NewExpression: class extends qe {
      bind() {
        super.bind()
        for (const e of this.arguments) e.deoptimizePath(F)
      }
      hasEffects(e) {
        for (const t of this.arguments) if (t.hasEffects(e)) return !0
        return (
          (!this.context.options.treeshake.annotations || !this.annotatedPure) &&
          (this.callee.hasEffects(e) ||
            this.callee.hasEffectsWhenCalledAtPath(B, this.callOptions, e))
        )
      }
      hasEffectsWhenAccessedAtPath(e) {
        return e.length > 1
      }
      initialise() {
        this.callOptions = { args: this.arguments, withNew: !0 }
      }
    },
    ObjectExpression: class extends qe {
      constructor() {
        super(...arguments),
          (this.deoptimizedPaths = new Set()),
          (this.expressionsToBeDeoptimized = new Map()),
          (this.hasUnknownDeoptimizedProperty = !1),
          (this.propertyMap = null),
          (this.unmatchablePropertiesRead = []),
          (this.unmatchablePropertiesWrite = [])
      }
      bind() {
        super.bind(), this.getPropertyMap()
      }
      deoptimizeCache() {
        this.hasUnknownDeoptimizedProperty || this.deoptimizeAllProperties()
      }
      deoptimizePath(e) {
        if (this.hasUnknownDeoptimizedProperty) return
        const t = this.getPropertyMap(),
          s = e[0]
        if (1 === e.length) {
          if ('string' != typeof s) return void this.deoptimizeAllProperties()
          if (!this.deoptimizedPaths.has(s)) {
            this.deoptimizedPaths.add(s)
            const e = this.expressionsToBeDeoptimized.get(s)
            if (e) for (const t of e) t.deoptimizeCache()
          }
        }
        const i = 1 === e.length ? F : e.slice(1)
        for (const e of 'string' == typeof s ? (t[s] ? t[s].propertiesRead : []) : this.properties)
          e.deoptimizePath(i)
      }
      getLiteralValueAtPath(e, t, s) {
        const i = this.getPropertyMap(),
          n = e[0]
        return 0 === e.length ||
          this.hasUnknownDeoptimizedProperty ||
          'string' != typeof n ||
          this.deoptimizedPaths.has(n)
          ? H
          : 1 !== e.length || i[n] || de[n] || 0 !== this.unmatchablePropertiesRead.length
            ? !i[n] || null === i[n].exactMatchRead || i[n].propertiesRead.length > 1
              ? H
              : (V(this.expressionsToBeDeoptimized, n, () => []).push(s),
                i[n].exactMatchRead.getLiteralValueAtPath(e.slice(1), t, s))
            : void V(this.expressionsToBeDeoptimized, n, () => []).push(s)
      }
      getReturnExpressionWhenCalledAtPath(e, t, s) {
        const i = this.getPropertyMap(),
          n = e[0]
        return 0 === e.length ||
          this.hasUnknownDeoptimizedProperty ||
          'string' != typeof n ||
          this.deoptimizedPaths.has(n)
          ? q
          : 1 !== e.length ||
              !de[n] ||
              0 !== this.unmatchablePropertiesRead.length ||
              (i[n] && null !== i[n].exactMatchRead)
            ? !i[n] || null === i[n].exactMatchRead || i[n].propertiesRead.length > 1
              ? q
              : (V(this.expressionsToBeDeoptimized, n, () => []).push(s),
                i[n].exactMatchRead.getReturnExpressionWhenCalledAtPath(e.slice(1), t, s))
            : ve(de, n)
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        if (0 === e.length) return !1
        const s = e[0],
          i = this.propertyMap
        if (
          e.length > 1 &&
          (this.hasUnknownDeoptimizedProperty ||
            'string' != typeof s ||
            this.deoptimizedPaths.has(s) ||
            !i[s] ||
            null === i[s].exactMatchRead)
        )
          return !0
        const n = e.slice(1)
        for (const e of 'string' != typeof s ? this.properties : i[s] ? i[s].propertiesRead : [])
          if (e.hasEffectsWhenAccessedAtPath(n, t)) return !0
        return !1
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        const s = e[0],
          i = this.propertyMap
        if (
          e.length > 1 &&
          (this.hasUnknownDeoptimizedProperty ||
            this.deoptimizedPaths.has(s) ||
            !i[s] ||
            null === i[s].exactMatchRead)
        )
          return !0
        const n = e.slice(1)
        for (const r of 'string' != typeof s
          ? this.properties
          : e.length > 1
            ? i[s].propertiesRead
            : i[s]
              ? i[s].propertiesWrite
              : [])
          if (r.hasEffectsWhenAssignedAtPath(n, t)) return !0
        return !1
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        const i = e[0]
        if (
          'string' != typeof i ||
          this.hasUnknownDeoptimizedProperty ||
          this.deoptimizedPaths.has(i) ||
          (this.propertyMap[i] ? !this.propertyMap[i].exactMatchRead : e.length > 1 || !de[i])
        )
          return !0
        const n = e.slice(1)
        if (this.propertyMap[i])
          for (const e of this.propertyMap[i].propertiesRead)
            if (e.hasEffectsWhenCalledAtPath(n, t, s)) return !0
        return !(1 !== e.length || !de[i]) && xe(de, i, this.included, t, s)
      }
      render(e, t, { renderedParentType: s } = st) {
        super.render(e, t),
          ('ExpressionStatement' !== s && 'ArrowFunctionExpression' !== s) ||
            (e.appendRight(this.start, '('), e.prependLeft(this.end, ')'))
      }
      deoptimizeAllProperties() {
        this.hasUnknownDeoptimizedProperty = !0
        for (const e of this.properties) e.deoptimizePath(F)
        for (const e of this.expressionsToBeDeoptimized.values())
          for (const t of e) t.deoptimizeCache()
      }
      getPropertyMap() {
        if (null !== this.propertyMap) return this.propertyMap
        const e = (this.propertyMap = Object.create(null))
        for (let t = this.properties.length - 1; t >= 0; t--) {
          const s = this.properties[t]
          if (s instanceof Je) {
            this.unmatchablePropertiesRead.push(s)
            continue
          }
          const i = 'get' !== s.kind,
            n = 'set' !== s.kind
          let r
          if (s.computed) {
            const e = s.key.getLiteralValueAtPath(B, j, this)
            if (e === H) {
              n ? this.unmatchablePropertiesRead.push(s) : this.unmatchablePropertiesWrite.push(s)
              continue
            }
            r = String(e)
          } else r = s.key instanceof yt ? s.key.name : String(s.key.value)
          const a = e[r]
          a
            ? (n &&
                null === a.exactMatchRead &&
                ((a.exactMatchRead = s),
                a.propertiesRead.push(s, ...this.unmatchablePropertiesRead)),
              i &&
                !n &&
                null === a.exactMatchWrite &&
                ((a.exactMatchWrite = s),
                a.propertiesWrite.push(s, ...this.unmatchablePropertiesWrite)))
            : (e[r] = {
                exactMatchRead: n ? s : null,
                exactMatchWrite: i ? s : null,
                propertiesRead: n ? [s, ...this.unmatchablePropertiesRead] : [],
                propertiesWrite: i && !n ? [s, ...this.unmatchablePropertiesWrite] : []
              })
        }
        return e
      }
    },
    ObjectPattern: class extends qe {
      addExportedVariables(e, t) {
        for (const s of this.properties)
          'Property' === s.type
            ? s.value.addExportedVariables(e, t)
            : s.argument.addExportedVariables(e, t)
      }
      declare(e, t) {
        const s = []
        for (const i of this.properties) s.push(...i.declare(e, t))
        return s
      }
      deoptimizePath(e) {
        if (0 === e.length) for (const t of this.properties) t.deoptimizePath(e)
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        if (e.length > 0) return !0
        for (const e of this.properties) if (e.hasEffectsWhenAssignedAtPath(B, t)) return !0
        return !1
      }
    },
    PrivateName: class extends qe {},
    Program: Qs,
    Property: class extends qe {
      constructor() {
        super(...arguments), (this.declarationInit = null), (this.returnExpression = null)
      }
      bind() {
        super.bind(),
          'get' === this.kind && this.getReturnExpression(),
          null !== this.declarationInit && this.declarationInit.deoptimizePath([D, D])
      }
      declare(e, t) {
        return (this.declarationInit = t), this.value.declare(e, q)
      }
      deoptimizeCache() {}
      deoptimizePath(e) {
        'get' === this.kind
          ? this.getReturnExpression().deoptimizePath(e)
          : this.value.deoptimizePath(e)
      }
      getLiteralValueAtPath(e, t, s) {
        return 'get' === this.kind
          ? this.getReturnExpression().getLiteralValueAtPath(e, t, s)
          : this.value.getLiteralValueAtPath(e, t, s)
      }
      getReturnExpressionWhenCalledAtPath(e, t, s) {
        return 'get' === this.kind
          ? this.getReturnExpression().getReturnExpressionWhenCalledAtPath(e, t, s)
          : this.value.getReturnExpressionWhenCalledAtPath(e, t, s)
      }
      hasEffects(e) {
        return this.key.hasEffects(e) || this.value.hasEffects(e)
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        if ('get' === this.kind) {
          const s = t.accessed.getEntities(e)
          return (
            !s.has(this) &&
            (s.add(this),
            this.value.hasEffectsWhenCalledAtPath(B, this.accessorCallOptions, t) ||
              (e.length > 0 && this.returnExpression.hasEffectsWhenAccessedAtPath(e, t)))
          )
        }
        return this.value.hasEffectsWhenAccessedAtPath(e, t)
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        if ('get' === this.kind) {
          const s = t.assigned.getEntities(e)
          return (
            !s.has(this) && (s.add(this), this.returnExpression.hasEffectsWhenAssignedAtPath(e, t))
          )
        }
        if ('set' === this.kind) {
          const s = t.assigned.getEntities(e)
          return (
            !s.has(this) &&
            (s.add(this), this.value.hasEffectsWhenCalledAtPath(B, this.accessorCallOptions, t))
          )
        }
        return this.value.hasEffectsWhenAssignedAtPath(e, t)
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        if ('get' === this.kind) {
          const i = (t.withNew ? s.instantiated : s.called).getEntities(e, t)
          return (
            !i.has(this) && (i.add(this), this.returnExpression.hasEffectsWhenCalledAtPath(e, t, s))
          )
        }
        return this.value.hasEffectsWhenCalledAtPath(e, t, s)
      }
      initialise() {
        this.accessorCallOptions = { args: O, withNew: !1 }
      }
      render(e, t) {
        this.shorthand || this.key.render(e, t),
          this.value.render(e, t, { isShorthandProperty: this.shorthand })
      }
      getReturnExpression() {
        return null === this.returnExpression
          ? ((this.returnExpression = q),
            (this.returnExpression = this.value.getReturnExpressionWhenCalledAtPath(B, j, this)))
          : this.returnExpression
      }
    },
    RestElement: xt,
    ReturnStatement: class extends qe {
      hasEffects(e) {
        return !(
          e.ignore.returnAwaitYield &&
          (null === this.argument || !this.argument.hasEffects(e)) &&
          ((e.brokenFlow = 2), 1)
        )
      }
      include(e, t) {
        ;(this.included = !0), this.argument && this.argument.include(e, t), (e.brokenFlow = 2)
      }
      initialise() {
        this.scope.addReturnExpression(this.argument || q)
      }
      render(e, t) {
        this.argument &&
          (this.argument.render(e, t, { preventASI: !0 }),
          this.argument.start === this.start + 6 && e.prependLeft(this.start + 6, ' '))
      }
    },
    SequenceExpression: class extends qe {
      deoptimizePath(e) {
        e.length > 0 && this.expressions[this.expressions.length - 1].deoptimizePath(e)
      }
      getLiteralValueAtPath(e, t, s) {
        return this.expressions[this.expressions.length - 1].getLiteralValueAtPath(e, t, s)
      }
      hasEffects(e) {
        for (const t of this.expressions) if (t.hasEffects(e)) return !0
        return !1
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        return (
          e.length > 0 &&
          this.expressions[this.expressions.length - 1].hasEffectsWhenAccessedAtPath(e, t)
        )
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        return (
          0 === e.length ||
          this.expressions[this.expressions.length - 1].hasEffectsWhenAssignedAtPath(e, t)
        )
      }
      hasEffectsWhenCalledAtPath(e, t, s) {
        return this.expressions[this.expressions.length - 1].hasEffectsWhenCalledAtPath(e, t, s)
      }
      include(e, t) {
        this.included = !0
        for (let s = 0; s < this.expressions.length - 1; s++) {
          const i = this.expressions[s]
          ;(t || i.shouldBeIncluded(e)) && i.include(e, t)
        }
        this.expressions[this.expressions.length - 1].include(e, t)
      }
      render(e, t, { renderedParentType: s, isCalleeOfRenderedParent: i, preventASI: n } = st) {
        let r = 0
        for (const { node: a, start: o, end: h } of I(this.expressions, e, this.start, this.end))
          a.included
            ? (r++,
              1 === r && n && N(e, o, a.start),
              a === this.expressions[this.expressions.length - 1] && 1 === r
                ? a.render(e, t, {
                    isCalleeOfRenderedParent: s ? i : this.parent.callee === this,
                    renderedParentType: s || this.parent.type
                  })
                : a.render(e, t))
            : b(a, e, o, h)
      }
    },
    SpreadElement: Je,
    Super: class extends qe {},
    SwitchCase: Js,
    SwitchStatement: class extends qe {
      createScope(e) {
        this.scope = new _s(e)
      }
      hasEffects(e) {
        if (this.discriminant.hasEffects(e)) return !0
        const {
          brokenFlow: t,
          ignore: { breaks: s }
        } = e
        let i = 1 / 0
        e.ignore.breaks = !0
        for (const s of this.cases) {
          if (s.hasEffects(e)) return !0
          ;(i = e.brokenFlow < i ? e.brokenFlow : i), (e.brokenFlow = t)
        }
        return null !== this.defaultCase && 1 !== i && (e.brokenFlow = i), (e.ignore.breaks = s), !1
      }
      include(e, t) {
        ;(this.included = !0), this.discriminant.include(e, t)
        const { brokenFlow: s } = e
        let i = 1 / 0,
          n = t || (null !== this.defaultCase && this.defaultCase < this.cases.length - 1)
        for (let r = this.cases.length - 1; r >= 0; r--) {
          const a = this.cases[r]
          if ((a.included && (n = !0), !n)) {
            const e = We()
            ;(e.ignore.breaks = !0), (n = a.hasEffects(e))
          }
          n
            ? (a.include(e, t), (i = i < e.brokenFlow ? i : e.brokenFlow), (e.brokenFlow = s))
            : (i = s)
        }
        n && null !== this.defaultCase && 1 !== i && (e.brokenFlow = i)
      }
      initialise() {
        for (let e = 0; e < this.cases.length; e++)
          if (null === this.cases[e].test) return void (this.defaultCase = e)
        this.defaultCase = null
      }
      render(e, t) {
        this.discriminant.render(e, t),
          this.cases.length > 0 && P(this.cases, e, this.cases[0].start, this.end - 1, t)
      }
    },
    TaggedTemplateExpression: class extends qe {
      bind() {
        if ((super.bind(), 'Identifier' === this.tag.type)) {
          const e = this.tag.name
          this.scope.findVariable(e).isNamespace &&
            this.context.warn(
              { code: 'CANNOT_CALL_NAMESPACE', message: `Cannot call a namespace ('${e}')` },
              this.start
            ),
            'eval' === e &&
              this.context.warn(
                {
                  code: 'EVAL',
                  message:
                    'Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification',
                  url: 'https://rollupjs.org/guide/en/#avoiding-eval'
                },
                this.start
              )
        }
      }
      hasEffects(e) {
        return super.hasEffects(e) || this.tag.hasEffectsWhenCalledAtPath(B, this.callOptions, e)
      }
      initialise() {
        this.callOptions = { args: O, withNew: !1 }
      }
    },
    TemplateElement: class extends qe {
      bind() {}
      hasEffects() {
        return !1
      }
      include() {
        this.included = !0
      }
      parseNode(e) {
        ;(this.value = e.value), super.parseNode(e)
      }
      render() {}
    },
    TemplateLiteral: Zs,
    ThisExpression: class extends qe {
      bind() {
        super.bind(), (this.variable = this.scope.findVariable('this'))
      }
      hasEffectsWhenAccessedAtPath(e, t) {
        return e.length > 0 && this.variable.hasEffectsWhenAccessedAtPath(e, t)
      }
      hasEffectsWhenAssignedAtPath(e, t) {
        return this.variable.hasEffectsWhenAssignedAtPath(e, t)
      }
      initialise() {
        ;(this.alias =
          this.scope.findLexicalBoundary() instanceof ei ? this.context.moduleContext : null),
          'undefined' === this.alias &&
            this.context.warn(
              {
                code: 'THIS_IS_UNDEFINED',
                message:
                  "The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten",
                url: 'https://rollupjs.org/guide/en/#error-this-is-undefined'
              },
              this.start
            )
      }
      render(e) {
        null !== this.alias &&
          e.overwrite(this.start, this.end, this.alias, { contentOnly: !1, storeName: !0 })
      }
    },
    ThrowStatement: class extends qe {
      hasEffects() {
        return !0
      }
      include(e, t) {
        ;(this.included = !0), this.argument.include(e, t), (e.brokenFlow = 2)
      }
      render(e, t) {
        this.argument.render(e, t, { preventASI: !0 }),
          this.argument.start === this.start + 5 && e.prependLeft(this.start + 5, ' ')
      }
    },
    TryStatement: class extends qe {
      constructor() {
        super(...arguments), (this.directlyIncluded = !1)
      }
      hasEffects(e) {
        return (
          (this.context.options.treeshake.tryCatchDeoptimization
            ? this.block.body.length > 0
            : this.block.hasEffects(e)) ||
          (null !== this.finalizer && this.finalizer.hasEffects(e))
        )
      }
      include(e, t) {
        var s
        const i =
            null === (s = this.context.options.treeshake) || void 0 === s
              ? void 0
              : s.tryCatchDeoptimization,
          { brokenFlow: n } = e
        ;(this.directlyIncluded && i) ||
          ((this.included = !0),
          (this.directlyIncluded = !0),
          this.block.include(e, i ? 'variables' : t),
          (e.brokenFlow = n)),
          null !== this.handler && (this.handler.include(e, t), (e.brokenFlow = n)),
          null !== this.finalizer && this.finalizer.include(e, t)
      }
    },
    UnaryExpression: class extends qe {
      bind() {
        super.bind(), 'delete' === this.operator && this.argument.deoptimizePath(B)
      }
      getLiteralValueAtPath(e, t, s) {
        if (e.length > 0) return H
        const i = this.argument.getLiteralValueAtPath(B, t, s)
        return i === H ? H : ti[this.operator](i)
      }
      hasEffects(e) {
        return (
          !('typeof' === this.operator && this.argument instanceof yt) &&
          (this.argument.hasEffects(e) ||
            ('delete' === this.operator && this.argument.hasEffectsWhenAssignedAtPath(B, e)))
        )
      }
      hasEffectsWhenAccessedAtPath(e) {
        return 'void' === this.operator ? e.length > 0 : e.length > 1
      }
    },
    UnknownNode: class extends qe {
      hasEffects() {
        return !0
      }
      include(e) {
        super.include(e, !0)
      }
    },
    UpdateExpression: class extends qe {
      bind() {
        super.bind(),
          this.argument.deoptimizePath(B),
          this.argument instanceof yt &&
            (this.scope.findVariable(this.argument.name).isReassigned = !0)
      }
      hasEffects(e) {
        return this.argument.hasEffects(e) || this.argument.hasEffectsWhenAssignedAtPath(B, e)
      }
      hasEffectsWhenAccessedAtPath(e) {
        return e.length > 1
      }
      render(e, t) {
        if ((this.argument.render(e, t), 'system' === t.format)) {
          const s = this.argument.variable,
            i = t.exportNamesByVariable.get(s)
          if (i && i.length) {
            const n = t.compact ? '' : ' ',
              r = s.getName()
            if (this.prefix)
              1 === i.length
                ? e.overwrite(this.start, this.end, `exports('${i[0]}',${n}${this.operator}${r})`)
                : e.overwrite(
                    this.start,
                    this.end,
                    `(${this.operator}${r},${n}${T([s], t)},${n}${r})`
                  )
            else if (i.length > 1)
              e.overwrite(this.start, this.end, `${L([s], !1, t)}${this.operator}${r})`)
            else {
              let t
              switch (this.operator) {
                case '++':
                  t = `${r}${n}+${n}1`
                  break
                case '--':
                  t = `${r}${n}-${n}1`
              }
              e.overwrite(
                this.start,
                this.end,
                `(exports('${i[0]}',${n}${t}),${n}${r}${this.operator})`
              )
            }
          }
        }
      }
    },
    VariableDeclaration: ii,
    VariableDeclarator: class extends qe {
      declareDeclarator(e) {
        this.id.declare(e, this.init || K)
      }
      deoptimizePath(e) {
        this.id.deoptimizePath(e)
      }
    },
    WhileStatement: class extends qe {
      hasEffects(e) {
        if (this.test.hasEffects(e)) return !0
        const {
          brokenFlow: t,
          ignore: { breaks: s, continues: i }
        } = e
        return (
          (e.ignore.breaks = !0),
          (e.ignore.continues = !0),
          !!this.body.hasEffects(e) ||
            ((e.ignore.breaks = s), (e.ignore.continues = i), (e.brokenFlow = t), !1)
        )
      }
      include(e, t) {
        ;(this.included = !0), this.test.include(e, t)
        const { brokenFlow: s } = e
        this.body.include(e, t), (e.brokenFlow = s)
      }
    },
    YieldExpression: class extends qe {
      bind() {
        super.bind(), null !== this.argument && this.argument.deoptimizePath(F)
      }
      hasEffects(e) {
        return !e.ignore.returnAwaitYield || (null !== this.argument && this.argument.hasEffects(e))
      }
      render(e, t) {
        this.argument &&
          (this.argument.render(e, t, { preventASI: !0 }),
          this.argument.start === this.start + 5 && e.prependLeft(this.start + 5, ' '))
      }
    }
  }
  function ri(e) {
    return e.id
  }
  function ai(e, t, s) {
    s(e, t)
  }
  function oi(e, t, s) {}
  var hi = {}
  function li(e, t, s = e.type) {
    let i = t.commentNodes[t.commentIndex]
    for (; i && e.start >= i.end; ) ci(e, i), (i = t.commentNodes[++t.commentIndex])
    i && i.end <= e.end && hi[s](e, t, li)
  }
  function ci(e, t) {
    e.annotations ? e.annotations.push(t) : (e.annotations = [t]),
      'ExpressionStatement' === e.type && (e = e.expression),
      ('CallExpression' !== e.type && 'NewExpression' !== e.type) || (e.annotatedPure = !0)
  }
  ;(hi.Program = hi.BlockStatement =
    function (e, t, s) {
      for (var i = 0, n = e.body; i < n.length; i += 1) s(n[i], t, 'Statement')
    }),
    (hi.Statement = ai),
    (hi.EmptyStatement = oi),
    (hi.ExpressionStatement =
      hi.ParenthesizedExpression =
      hi.ChainExpression =
        function (e, t, s) {
          return s(e.expression, t, 'Expression')
        }),
    (hi.IfStatement = function (e, t, s) {
      s(e.test, t, 'Expression'),
        s(e.consequent, t, 'Statement'),
        e.alternate && s(e.alternate, t, 'Statement')
    }),
    (hi.LabeledStatement = function (e, t, s) {
      return s(e.body, t, 'Statement')
    }),
    (hi.BreakStatement = hi.ContinueStatement = oi),
    (hi.WithStatement = function (e, t, s) {
      s(e.object, t, 'Expression'), s(e.body, t, 'Statement')
    }),
    (hi.SwitchStatement = function (e, t, s) {
      s(e.discriminant, t, 'Expression')
      for (var i = 0, n = e.cases; i < n.length; i += 1) {
        var r = n[i]
        r.test && s(r.test, t, 'Expression')
        for (var a = 0, o = r.consequent; a < o.length; a += 1) s(o[a], t, 'Statement')
      }
    }),
    (hi.SwitchCase = function (e, t, s) {
      e.test && s(e.test, t, 'Expression')
      for (var i = 0, n = e.consequent; i < n.length; i += 1) s(n[i], t, 'Statement')
    }),
    (hi.ReturnStatement =
      hi.YieldExpression =
      hi.AwaitExpression =
        function (e, t, s) {
          e.argument && s(e.argument, t, 'Expression')
        }),
    (hi.ThrowStatement = hi.SpreadElement =
      function (e, t, s) {
        return s(e.argument, t, 'Expression')
      }),
    (hi.TryStatement = function (e, t, s) {
      s(e.block, t, 'Statement'),
        e.handler && s(e.handler, t),
        e.finalizer && s(e.finalizer, t, 'Statement')
    }),
    (hi.CatchClause = function (e, t, s) {
      e.param && s(e.param, t, 'Pattern'), s(e.body, t, 'Statement')
    }),
    (hi.WhileStatement = hi.DoWhileStatement =
      function (e, t, s) {
        s(e.test, t, 'Expression'), s(e.body, t, 'Statement')
      }),
    (hi.ForStatement = function (e, t, s) {
      e.init && s(e.init, t, 'ForInit'),
        e.test && s(e.test, t, 'Expression'),
        e.update && s(e.update, t, 'Expression'),
        s(e.body, t, 'Statement')
    }),
    (hi.ForInStatement = hi.ForOfStatement =
      function (e, t, s) {
        s(e.left, t, 'ForInit'), s(e.right, t, 'Expression'), s(e.body, t, 'Statement')
      }),
    (hi.ForInit = function (e, t, s) {
      'VariableDeclaration' === e.type ? s(e, t) : s(e, t, 'Expression')
    }),
    (hi.DebuggerStatement = oi),
    (hi.FunctionDeclaration = function (e, t, s) {
      return s(e, t, 'Function')
    }),
    (hi.VariableDeclaration = function (e, t, s) {
      for (var i = 0, n = e.declarations; i < n.length; i += 1) s(n[i], t)
    }),
    (hi.VariableDeclarator = function (e, t, s) {
      s(e.id, t, 'Pattern'), e.init && s(e.init, t, 'Expression')
    }),
    (hi.Function = function (e, t, s) {
      e.id && s(e.id, t, 'Pattern')
      for (var i = 0, n = e.params; i < n.length; i += 1) s(n[i], t, 'Pattern')
      s(e.body, t, e.expression ? 'Expression' : 'Statement')
    }),
    (hi.Pattern = function (e, t, s) {
      'Identifier' === e.type
        ? s(e, t, 'VariablePattern')
        : 'MemberExpression' === e.type
          ? s(e, t, 'MemberPattern')
          : s(e, t)
    }),
    (hi.VariablePattern = oi),
    (hi.MemberPattern = ai),
    (hi.RestElement = function (e, t, s) {
      return s(e.argument, t, 'Pattern')
    }),
    (hi.ArrayPattern = function (e, t, s) {
      for (var i = 0, n = e.elements; i < n.length; i += 1) {
        var r = n[i]
        r && s(r, t, 'Pattern')
      }
    }),
    (hi.ObjectPattern = function (e, t, s) {
      for (var i = 0, n = e.properties; i < n.length; i += 1) {
        var r = n[i]
        'Property' === r.type
          ? (r.computed && s(r.key, t, 'Expression'), s(r.value, t, 'Pattern'))
          : 'RestElement' === r.type && s(r.argument, t, 'Pattern')
      }
    }),
    (hi.Expression = ai),
    (hi.ThisExpression = hi.Super = hi.MetaProperty = oi),
    (hi.ArrayExpression = function (e, t, s) {
      for (var i = 0, n = e.elements; i < n.length; i += 1) {
        var r = n[i]
        r && s(r, t, 'Expression')
      }
    }),
    (hi.ObjectExpression = function (e, t, s) {
      for (var i = 0, n = e.properties; i < n.length; i += 1) s(n[i], t)
    }),
    (hi.FunctionExpression = hi.ArrowFunctionExpression = hi.FunctionDeclaration),
    (hi.SequenceExpression = function (e, t, s) {
      for (var i = 0, n = e.expressions; i < n.length; i += 1) s(n[i], t, 'Expression')
    }),
    (hi.TemplateLiteral = function (e, t, s) {
      for (var i = 0, n = e.quasis; i < n.length; i += 1) s(n[i], t)
      for (var r = 0, a = e.expressions; r < a.length; r += 1) s(a[r], t, 'Expression')
    }),
    (hi.TemplateElement = oi),
    (hi.UnaryExpression = hi.UpdateExpression =
      function (e, t, s) {
        s(e.argument, t, 'Expression')
      }),
    (hi.BinaryExpression = hi.LogicalExpression =
      function (e, t, s) {
        s(e.left, t, 'Expression'), s(e.right, t, 'Expression')
      }),
    (hi.AssignmentExpression = hi.AssignmentPattern =
      function (e, t, s) {
        s(e.left, t, 'Pattern'), s(e.right, t, 'Expression')
      }),
    (hi.ConditionalExpression = function (e, t, s) {
      s(e.test, t, 'Expression'), s(e.consequent, t, 'Expression'), s(e.alternate, t, 'Expression')
    }),
    (hi.NewExpression = hi.CallExpression =
      function (e, t, s) {
        if ((s(e.callee, t, 'Expression'), e.arguments))
          for (var i = 0, n = e.arguments; i < n.length; i += 1) s(n[i], t, 'Expression')
      }),
    (hi.MemberExpression = function (e, t, s) {
      s(e.object, t, 'Expression'), e.computed && s(e.property, t, 'Expression')
    }),
    (hi.ExportNamedDeclaration = hi.ExportDefaultDeclaration =
      function (e, t, s) {
        e.declaration &&
          s(
            e.declaration,
            t,
            'ExportNamedDeclaration' === e.type || e.declaration.id ? 'Statement' : 'Expression'
          ),
          e.source && s(e.source, t, 'Expression')
      }),
    (hi.ExportAllDeclaration = function (e, t, s) {
      e.exported && s(e.exported, t), s(e.source, t, 'Expression')
    }),
    (hi.ImportDeclaration = function (e, t, s) {
      for (var i = 0, n = e.specifiers; i < n.length; i += 1) s(n[i], t)
      s(e.source, t, 'Expression')
    }),
    (hi.ImportExpression = function (e, t, s) {
      s(e.source, t, 'Expression')
    }),
    (hi.ImportSpecifier =
      hi.ImportDefaultSpecifier =
      hi.ImportNamespaceSpecifier =
      hi.Identifier =
      hi.Literal =
        oi),
    (hi.TaggedTemplateExpression = function (e, t, s) {
      s(e.tag, t, 'Expression'), s(e.quasi, t, 'Expression')
    }),
    (hi.ClassDeclaration = hi.ClassExpression =
      function (e, t, s) {
        return s(e, t, 'Class')
      }),
    (hi.Class = function (e, t, s) {
      e.id && s(e.id, t, 'Pattern'), e.superClass && s(e.superClass, t, 'Expression'), s(e.body, t)
    }),
    (hi.ClassBody = function (e, t, s) {
      for (var i = 0, n = e.body; i < n.length; i += 1) s(n[i], t)
    }),
    (hi.MethodDefinition = hi.Property =
      function (e, t, s) {
        e.computed && s(e.key, t, 'Expression'), s(e.value, t, 'Expression')
      }),
    (hi.FieldDefinition = function (e, t, s) {
      e.computed && s(e.key, t, 'Expression'), e.value && s(e.value, t, 'Expression')
    })
  const ui = /[@#]__PURE__/,
    pi = (e) => ui.test(e.text),
    di = new RegExp('^#\\s+sourceMappingURL=.+\\n?'),
    fi = () => {}
  let mi = () => [0, 0],
    gi = () => 0,
    yi = () => 0,
    xi = {}
  function vi(e, t) {
    switch (t) {
      case 1:
        return '# ' + e
      case 2:
        return '## ' + e
      case 3:
        return e
      default:
        return `${'  '.repeat(t - 4)}- ${e}`
    }
  }
  function Ei(e, t = 3) {
    ;(e = vi(e, t)),
      xi.hasOwnProperty(e) ||
        (xi[e] = { memory: 0, startMemory: void 0, startTime: void 0, time: 0, totalMemory: 0 })
    const s = yi()
    ;(xi[e].startTime = mi()), (xi[e].startMemory = s)
  }
  function bi(e, t = 3) {
    if (((e = vi(e, t)), xi.hasOwnProperty(e))) {
      const t = yi()
      ;(xi[e].time += gi(xi[e].startTime)),
        (xi[e].totalMemory = Math.max(xi[e].totalMemory, t)),
        (xi[e].memory += t - xi[e].startMemory)
    }
  }
  function Si() {
    const e = {}
    for (const t of Object.keys(xi)) e[t] = [xi[t].time, xi[t].memory, xi[t].totalMemory]
    return e
  }
  let _i = fi,
    Ai = fi
  const ki = { load: !0, resolveDynamicImport: !0, resolveId: !0, transform: !0 }
  function Ci(e, t) {
    const s = {}
    for (const i of Object.keys(e))
      if (!0 === ki[i]) {
        let n = 'plugin ' + t
        e.name && (n += ` (${e.name})`),
          (n += ' - ' + i),
          (s[i] = function () {
            _i(n, 4)
            const t = e[i].apply(this === s ? e : this, arguments)
            return (
              Ai(n, 4),
              t &&
                'function' == typeof t.then &&
                (_i(n + ' (async)', 4), t.then(() => Ai(n + ' (async)', 4))),
              t
            )
          })
      } else s[i] = e[i]
    return s
  }
  function wi(e, t, s, i) {
    return t.error(
      {
        code: 'MISSING_EXPORT',
        message: `'${e}' is not exported by ${Yt(s)}, imported by ${Yt(t.id)}`,
        url: 'https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module'
      },
      i
    )
  }
  const Pi = { identifier: null, localName: '_missingExportShim' }
  function Ii(e, t, s, i = new Map()) {
    const n = i.get(t)
    if (n) {
      if (n.has(e)) return null
      n.add(e)
    } else i.set(t, new Set([e]))
    return e.getVariableForExportName(t, s, i)
  }
  class Ni {
    constructor(e, t, s, i, n, r, a) {
      ;(this.graph = e),
        (this.id = t),
        (this.options = s),
        (this.isEntryPoint = i),
        (this.moduleSideEffects = n),
        (this.syntheticNamedExports = r),
        (this.meta = a),
        (this.chunkFileNames = new Set()),
        (this.chunkName = null),
        (this.comments = []),
        (this.dependencies = new Set()),
        (this.dynamicDependencies = new Set()),
        (this.dynamicImporters = []),
        (this.dynamicImports = []),
        (this.execIndex = 1 / 0),
        (this.exportAllSources = new Set()),
        (this.exports = Object.create(null)),
        (this.exportsAll = Object.create(null)),
        (this.implicitlyLoadedAfter = new Set()),
        (this.implicitlyLoadedBefore = new Set()),
        (this.importDescriptions = Object.create(null)),
        (this.importers = []),
        (this.importMetas = []),
        (this.imports = new Set()),
        (this.includedDynamicImporters = []),
        (this.isExecuted = !1),
        (this.isUserDefinedEntryPoint = !1),
        (this.preserveSignature = this.options.preserveEntrySignatures),
        (this.reexportDescriptions = Object.create(null)),
        (this.sources = new Set()),
        (this.userChunkNames = new Set()),
        (this.usesTopLevelAwait = !1),
        (this.allExportNames = null),
        (this.exportAllModules = []),
        (this.exportNamesByVariable = null),
        (this.exportShimVariable = new At(this)),
        (this.relevantDependencies = null),
        (this.syntheticExports = new Map()),
        (this.syntheticNamespace = null),
        (this.transformDependencies = []),
        (this.transitiveReexports = null),
        (this.excludeFromSourcemap = /\0/.test(t)),
        (this.context = s.moduleContext(t))
    }
    basename() {
      const e = Me(this.id),
        t = $e(this.id)
      return we(t ? e.slice(0, -t.length) : e)
    }
    bindReferences() {
      this.ast.bind()
    }
    error(e, t) {
      return this.addLocationToLogProps(e, t), Jt(e)
    }
    getAllExportNames() {
      if (this.allExportNames) return this.allExportNames
      const e = (this.allExportNames = new Set())
      for (const t of Object.keys(this.exports)) e.add(t)
      for (const t of Object.keys(this.reexportDescriptions)) e.add(t)
      for (const t of this.exportAllModules)
        if (t instanceof De) e.add('*' + t.id)
        else for (const s of t.getAllExportNames()) 'default' !== s && e.add(s)
      return e
    }
    getDependenciesToBeIncluded() {
      if (this.relevantDependencies) return this.relevantDependencies
      const e = new Set(),
        t = new Set(),
        s = new Set(this.dependencies)
      let i = this.imports
      if (
        this.isEntryPoint ||
        this.includedDynamicImporters.length > 0 ||
        this.namespace.included ||
        this.implicitlyLoadedAfter.size > 0
      ) {
        i = new Set(i)
        for (const e of [...this.getReexports(), ...this.getExports()])
          i.add(this.getVariableForExportName(e))
      }
      for (let n of i) {
        if (n instanceof Ct) n = n.getBaseVariable()
        else if (n instanceof _t) {
          const { modules: e, original: i } = n.getOriginalVariableAndDeclarationModules()
          n = i
          for (const i of e) t.add(i), s.add(i)
        }
        e.add(n.module)
      }
      if (this.options.treeshake && 'no-treeshake' !== this.moduleSideEffects) {
        for (const i of s)
          if ((i.moduleSideEffects || t.has(i)) && !e.has(i))
            if (i instanceof De || i.hasEffects()) e.add(i)
            else for (const e of i.dependencies) s.add(e)
      } else for (const t of this.dependencies) e.add(t)
      return (this.relevantDependencies = e)
    }
    getExportNamesByVariable() {
      if (this.exportNamesByVariable) return this.exportNamesByVariable
      const e = new Map()
      for (const t of this.getAllExportNames()) {
        if (t === this.syntheticNamedExports) continue
        let s = this.getVariableForExportName(t)
        if (
          (s instanceof _t && (s = s.getOriginalVariable()), !s || !(s.included || s instanceof be))
        )
          continue
        const i = e.get(s)
        i ? i.push(t) : e.set(s, [t])
      }
      return (this.exportNamesByVariable = e)
    }
    getExports() {
      return Object.keys(this.exports)
    }
    getReexports() {
      if (this.transitiveReexports) return this.transitiveReexports
      this.transitiveReexports = []
      const e = new Set()
      for (const t in this.reexportDescriptions) e.add(t)
      for (const t of this.exportAllModules)
        if (t instanceof De) e.add('*' + t.id)
        else for (const s of [...t.getReexports(), ...t.getExports()]) 'default' !== s && e.add(s)
      return (this.transitiveReexports = [...e])
    }
    getRenderedExports() {
      const e = [],
        t = []
      for (const s in this.exports) {
        const i = this.getVariableForExportName(s)
        ;(i && i.included ? e : t).push(s)
      }
      return { renderedExports: e, removedExports: t }
    }
    getSyntheticNamespace() {
      return (
        null === this.syntheticNamespace &&
          ((this.syntheticNamespace = void 0),
          (this.syntheticNamespace = this.getVariableForExportName(
            'string' == typeof this.syntheticNamedExports ? this.syntheticNamedExports : 'default'
          ))),
        this.syntheticNamespace
          ? this.syntheticNamespace
          : Jt({
              code: es.SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT,
              id: this.id,
              message: `Module "${Yt(this.id)}" that is marked with 'syntheticNamedExports: ${JSON.stringify(this.syntheticNamedExports)}' needs ${'string' == typeof this.syntheticNamedExports && 'default' !== this.syntheticNamedExports ? `an export named "${this.syntheticNamedExports}"` : 'a default export'}.`
            })
      )
    }
    getVariableForExportName(e, t, s) {
      if ('*' === e[0])
        return 1 === e.length
          ? this.namespace
          : this.graph.modulesById.get(e.slice(1)).getVariableForExportName('*')
      const i = this.reexportDescriptions[e]
      if (i) {
        return Ii(i.module, i.localName, !1, s) || wi(i.localName, this, i.module.id, i.start)
      }
      const n = this.exports[e]
      if (n) {
        if (n === Pi) return this.exportShimVariable
        const e = n.localName
        return this.traceVariable(e)
      }
      if ('default' !== e)
        for (const t of this.exportAllModules) {
          const i = Ii(t, e, !0, s)
          if (i) return i
        }
      if (!t) {
        if (this.syntheticNamedExports) {
          let t = this.syntheticExports.get(e)
          if (!t) {
            const s = this.getSyntheticNamespace()
            return (t = new Ct(this.astContext, e, s)), this.syntheticExports.set(e, t), t
          }
          return t
        }
        if (this.options.shimMissingExports)
          return this.shimMissingExport(e), this.exportShimVariable
      }
      return null
    }
    hasEffects() {
      return (
        'no-treeshake' === this.moduleSideEffects ||
        (this.ast.included && this.ast.hasEffects(We()))
      )
    }
    include() {
      const e = Fe()
      this.ast.shouldBeIncluded(e) && this.ast.include(e, !1)
    }
    includeAllExports(e) {
      this.isExecuted || ((this.graph.needsTreeshakingPass = !0), Be(this))
      for (const t of this.getExports())
        if (e || t !== this.syntheticNamedExports) {
          const e = this.getVariableForExportName(t)
          e.deoptimizePath(F), e.included || (e.include(), (this.graph.needsTreeshakingPass = !0))
        }
      for (const e of this.getReexports()) {
        const t = this.getVariableForExportName(e)
        t.deoptimizePath(F),
          t.included || (t.include(), (this.graph.needsTreeshakingPass = !0)),
          t instanceof be && (t.module.reexported = !0)
      }
      e && this.namespace.prepareNamespace(this.includeAndGetAdditionalMergedNamespaces())
    }
    includeAllInBundle() {
      this.ast.include(Fe(), !0)
    }
    isIncluded() {
      return this.ast.included || this.namespace.included
    }
    linkImports() {
      this.addModulesToImportDescriptions(this.importDescriptions),
        this.addModulesToImportDescriptions(this.reexportDescriptions)
      for (const e in this.exports) 'default' !== e && (this.exportsAll[e] = this.id)
      const e = []
      for (const t of this.exportAllSources) {
        const s = this.graph.modulesById.get(this.resolvedIds[t].id)
        if (s instanceof De) e.push(s)
        else {
          this.exportAllModules.push(s)
          for (const e in s.exportsAll)
            e in this.exportsAll
              ? this.options.onwarn(ns(e, this, s))
              : (this.exportsAll[e] = s.exportsAll[e])
        }
      }
      this.exportAllModules.push(...e)
    }
    render(e) {
      const t = this.magicString.clone()
      return this.ast.render(t, e), (this.usesTopLevelAwait = this.astContext.usesTopLevelAwait), t
    }
    setSource({
      alwaysRemovedCode: e,
      ast: t,
      code: s,
      customTransformCache: i,
      originalCode: n,
      originalSourcemap: r,
      resolvedIds: a,
      sourcemapChain: o,
      transformDependencies: h,
      transformFiles: l,
      ...c
    }) {
      if (
        ((this.code = s),
        (this.originalCode = n),
        (this.originalSourcemap = r),
        (this.sourcemapChain = o),
        l && (this.transformFiles = l),
        (this.transformDependencies = h),
        (this.customTransformCache = i),
        this.updateOptions(c),
        _i('generate ast', 3),
        (this.alwaysRemovedCode = e || []),
        t)
      )
        this.esTreeAst = t
      else {
        this.esTreeAst = (function (e, t, s) {
          try {
            return t.parse(e.code, {
              ...s,
              onComment: (t, s, i, n) => e.comments.push({ block: t, text: s, start: i, end: n })
            })
          } catch (t) {
            let s = t.message.replace(/ \(\d+:\d+\)$/, '')
            return (
              e.id.endsWith('.json')
                ? (s += ' (Note that you need @rollup/plugin-json to import JSON files)')
                : e.id.endsWith('.js') ||
                  (s += ' (Note that you need plugins to import files that are not JavaScript)'),
              e.error({ code: 'PARSE_ERROR', message: s, parserError: t }, t.pos)
            )
          }
        })(this, this.graph.acornParser, this.options.acorn)
        for (const e of this.comments)
          !e.block && di.test(e.text) && this.alwaysRemovedCode.push([e.start, e.end])
        ;(u = this.comments), li(this.esTreeAst, { commentIndex: 0, commentNodes: u.filter(pi) })
      }
      var u
      Ai('generate ast', 3), (this.resolvedIds = a || Object.create(null))
      const p = this.id
      this.magicString = new y(s, {
        filename: this.excludeFromSourcemap ? null : p,
        indentExclusionRanges: []
      })
      for (const [e, t] of this.alwaysRemovedCode) this.magicString.remove(e, t)
      _i('analyse ast', 3),
        (this.astContext = {
          addDynamicImport: this.addDynamicImport.bind(this),
          addExport: this.addExport.bind(this),
          addImport: this.addImport.bind(this),
          addImportMeta: this.addImportMeta.bind(this),
          code: s,
          deoptimizationTracker: this.graph.deoptimizationTracker,
          error: this.error.bind(this),
          fileName: p,
          getExports: this.getExports.bind(this),
          getModuleExecIndex: () => this.execIndex,
          getModuleName: this.basename.bind(this),
          getReexports: this.getReexports.bind(this),
          importDescriptions: this.importDescriptions,
          includeAllExports: () => this.includeAllExports(!0),
          includeDynamicImport: this.includeDynamicImport.bind(this),
          includeVariable: this.includeVariable.bind(this),
          magicString: this.magicString,
          module: this,
          moduleContext: this.context,
          nodeConstructors: ni,
          options: this.options,
          traceExport: this.getVariableForExportName.bind(this),
          traceVariable: this.traceVariable.bind(this),
          usesTopLevelAwait: !1,
          warn: this.warn.bind(this)
        }),
        (this.scope = new ei(this.graph.scope, this.astContext)),
        (this.namespace = new kt(this.astContext, this.syntheticNamedExports)),
        (this.ast = new Qs(
          this.esTreeAst,
          { type: 'Module', context: this.astContext },
          this.scope
        )),
        Ai('analyse ast', 3)
    }
    toJSON() {
      return {
        alwaysRemovedCode: this.alwaysRemovedCode,
        ast: this.esTreeAst,
        code: this.code,
        customTransformCache: this.customTransformCache,
        dependencies: Array.from(this.dependencies, ri),
        id: this.id,
        meta: this.meta,
        moduleSideEffects: this.moduleSideEffects,
        originalCode: this.originalCode,
        originalSourcemap: this.originalSourcemap,
        resolvedIds: this.resolvedIds,
        sourcemapChain: this.sourcemapChain,
        syntheticNamedExports: this.syntheticNamedExports,
        transformDependencies: this.transformDependencies,
        transformFiles: this.transformFiles
      }
    }
    traceVariable(e) {
      const t = this.scope.variables.get(e)
      if (t) return t
      if (e in this.importDescriptions) {
        const t = this.importDescriptions[e],
          s = t.module
        return s instanceof Ni && '*' === t.name
          ? s.namespace
          : s.getVariableForExportName(t.name) || wi(t.name, this, s.id, t.start)
      }
      return null
    }
    updateOptions({ meta: e, moduleSideEffects: t, syntheticNamedExports: s }) {
      null != t && (this.moduleSideEffects = t),
        null != s && (this.syntheticNamedExports = s),
        null != e && (this.meta = { ...this.meta, ...e })
    }
    warn(e, t) {
      this.addLocationToLogProps(e, t), this.options.onwarn(e)
    }
    addDynamicImport(e) {
      let t = e.source
      t instanceof Zs
        ? 1 === t.quasis.length && t.quasis[0].value.cooked && (t = t.quasis[0].value.cooked)
        : t instanceof Ps && 'string' == typeof t.value && (t = t.value),
        this.dynamicImports.push({ node: e, resolution: null, argument: t })
    }
    addExport(e) {
      if (e instanceof bt)
        this.exports.default = {
          identifier: e.variable.getAssignedVariableName(),
          localName: 'default'
        }
      else if (e instanceof Ss) {
        const t = e.source.value
        if ((this.sources.add(t), e.exported)) {
          const s = e.exported.name
          this.reexportDescriptions[s] = { localName: '*', module: null, source: t, start: e.start }
        } else this.exportAllSources.add(t)
      } else if (e.source instanceof Ps) {
        const t = e.source.value
        this.sources.add(t)
        for (const s of e.specifiers) {
          const e = s.exported.name
          this.reexportDescriptions[e] = {
            localName: s.local.name,
            module: null,
            source: t,
            start: s.start
          }
        }
      } else if (e.declaration) {
        const t = e.declaration
        if (t instanceof ii)
          for (const e of t.declarations)
            for (const t of bs(e.id)) this.exports[t] = { identifier: null, localName: t }
        else {
          const e = t.id.name
          this.exports[e] = { identifier: null, localName: e }
        }
      } else
        for (const t of e.specifiers) {
          const e = t.local.name,
            s = t.exported.name
          this.exports[s] = { identifier: null, localName: e }
        }
    }
    addImport(e) {
      const t = e.source.value
      this.sources.add(t)
      for (const s of e.specifiers) {
        const e = 'ImportDefaultSpecifier' === s.type,
          i = 'ImportNamespaceSpecifier' === s.type,
          n = e ? 'default' : i ? '*' : s.imported.name
        this.importDescriptions[s.local.name] = { module: null, name: n, source: t, start: s.start }
      }
    }
    addImportMeta(e) {
      this.importMetas.push(e)
    }
    addLocationToLogProps(e, t) {
      ;(e.id = this.id), (e.pos = t)
      let s = this.code,
        { column: i, line: n } = Ge(s, t, { offsetLine: 1 })
      try {
        ;({ column: i, line: n } = (function (e, t) {
          const s = e.filter((e) => e.mappings)
          for (; s.length > 0; ) {
            const e = s.pop(),
              i = e.mappings[t.line - 1]
            let n = !1
            if (void 0 !== i)
              for (const s of i)
                if (s[0] >= t.column) {
                  if (1 === s.length) break
                  ;(t = {
                    column: s[3],
                    line: s[2] + 1,
                    name: 5 === s.length ? e.names[s[4]] : void 0,
                    source: e.sources[s[1]]
                  }),
                    (n = !0)
                  break
                }
            if (!n) throw new Error("Can't resolve original location of error.")
          }
          return t
        })(this.sourcemapChain, { column: i, line: n })),
          (s = this.originalCode)
      } catch (e) {
        this.options.onwarn({
          code: 'SOURCEMAP_ERROR',
          id: this.id,
          loc: { column: i, file: this.id, line: n },
          message: 'Error when using sourcemap for reporting an error: ' + e.message,
          pos: t
        })
      }
      Zt(e, { column: i, line: n }, s, this.id)
    }
    addModulesToImportDescriptions(e) {
      for (const t of Object.keys(e)) {
        const s = e[t],
          i = this.resolvedIds[s.source].id
        s.module = this.graph.modulesById.get(i)
      }
    }
    includeAndGetAdditionalMergedNamespaces() {
      const e = []
      for (const t of this.exportAllModules)
        if (t instanceof De) {
          const s = t.getVariableForExportName('*')
          s.include(), this.imports.add(s), e.push(s)
        } else if (t.syntheticNamedExports) {
          const s = t.getSyntheticNamespace()
          s.include(), this.imports.add(s), e.push(s)
        }
      return e
    }
    includeDynamicImport(e) {
      const t = this.dynamicImports.find((t) => t.node === e).resolution
      t instanceof Ni && (t.includedDynamicImporters.push(this), t.includeAllExports(!0))
    }
    includeVariable(e) {
      const t = e.module
      e.included || (e.include(), (this.graph.needsTreeshakingPass = !0)),
        t && t !== this && this.imports.add(e)
    }
    shimMissingExport(e) {
      this.options.onwarn({
        code: 'SHIMMED_EXPORT',
        exporter: Yt(this.id),
        exportName: e,
        message: `Missing export "${e}" has been shimmed in module ${Yt(this.id)}.`
      }),
        (this.exports[e] = Pi)
    }
  }
  class Ti {
    constructor(e, t) {
      ;(this.isOriginal = !0), (this.filename = e), (this.content = t)
    }
    traceSegment(e, t, s) {
      return { line: e, column: t, name: s, source: this }
    }
  }
  class Li {
    constructor(e, t) {
      ;(this.sources = t), (this.names = e.names), (this.mappings = e.mappings)
    }
    traceMappings() {
      const e = [],
        t = [],
        s = [],
        i = []
      for (const n of this.mappings) {
        const r = []
        for (const i of n) {
          if (1 == i.length) continue
          const n = this.sources[i[1]]
          if (!n) continue
          const a = n.traceSegment(i[2], i[3], 5 === i.length ? this.names[i[4]] : '')
          if (a) {
            let n = e.lastIndexOf(a.source.filename)
            if (-1 === n) (n = e.length), e.push(a.source.filename), (t[n] = a.source.content)
            else if (null == t[n]) t[n] = a.source.content
            else if (null != a.source.content && t[n] !== a.source.content)
              return Jt({
                message: 'Multiple conflicting contents for sourcemap source ' + a.source.filename
              })
            const o = [i[0], n, a.line, a.column]
            if (a.name) {
              let e = s.indexOf(a.name)
              ;-1 === e && ((e = s.length), s.push(a.name)), (o[4] = e)
            }
            r.push(o)
          }
        }
        i.push(r)
      }
      return { sources: e, sourcesContent: t, names: s, mappings: i }
    }
    traceSegment(e, t, s) {
      const i = this.mappings[e]
      if (!i) return null
      let n = 0,
        r = i.length - 1
      for (; n <= r; ) {
        const e = (n + r) >> 1,
          a = i[e]
        if (a[0] === t) {
          if (1 == a.length) return null
          const e = this.sources[a[1]]
          return e ? e.traceSegment(a[2], a[3], 5 === a.length ? this.names[a[4]] : s) : null
        }
        a[0] > t ? (r = e - 1) : (n = e + 1)
      }
      return null
    }
  }
  function Mi(e) {
    return function (t, s) {
      return s.mappings
        ? new Li(s, [t])
        : (e({
            code: 'SOURCEMAP_BROKEN',
            message: `Sourcemap is likely to be incorrect: a plugin (${s.plugin}) was used to transform files, but didn't generate a sourcemap for the transformation. Consult the plugin documentation for help`,
            plugin: s.plugin,
            url: 'https://rollupjs.org/guide/en/#warning-sourcemap-is-likely-to-be-incorrect'
          }),
          new Li({ mappings: [], names: [] }, [t]))
    }
  }
  function Ri(e, t, s, i, n) {
    let r
    if (s) {
      const t = s.sources,
        i = s.sourcesContent || [],
        n = Re(e) || '.',
        a = s.sourceRoot || '.',
        o = t.map((e, t) => new Ti(Ve(n, a, e), i[t]))
      r = new Li(s, o)
    } else r = new Ti(e, t)
    return i.reduce(n, r)
  }
  var $i,
    Oi = Vi
  function Vi(e, t) {
    if (!e) throw new Error(t || 'Assertion failed')
  }
  function Di(e, t) {
    return (
      55296 == (64512 & e.charCodeAt(t)) &&
      !(t < 0 || t + 1 >= e.length) &&
      56320 == (64512 & e.charCodeAt(t + 1))
    )
  }
  function Bi(e) {
    return ((e >>> 24) | ((e >>> 8) & 65280) | ((e << 8) & 16711680) | ((255 & e) << 24)) >>> 0
  }
  function Fi(e) {
    return 1 === e.length ? '0' + e : e
  }
  function Wi(e) {
    return 7 === e.length
      ? '0' + e
      : 6 === e.length
        ? '00' + e
        : 5 === e.length
          ? '000' + e
          : 4 === e.length
            ? '0000' + e
            : 3 === e.length
              ? '00000' + e
              : 2 === e.length
                ? '000000' + e
                : 1 === e.length
                  ? '0000000' + e
                  : e
  }
  Vi.equal = function (e, t, s) {
    if (e != t) throw new Error(s || 'Assertion failed: ' + e + ' != ' + t)
  }
  var Ui = {
    inherits:
      ((function (e) {
        'function' == typeof Object.create
          ? (e.exports = function (e, t) {
              t &&
                ((e.super_ = t),
                (e.prototype = Object.create(t.prototype, {
                  constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
                })))
            })
          : (e.exports = function (e, t) {
              if (t) {
                e.super_ = t
                var s = function () {}
                ;(s.prototype = t.prototype), (e.prototype = new s()), (e.prototype.constructor = e)
              }
            })
      })(
        ($i = {
          path: void 0,
          exports: {},
          require: function (e, t) {
            return (function () {
              throw new Error(
                'Dynamic requires are not currently supported by @rollup/plugin-commonjs'
              )
            })()
          }
        })
      ),
      $i.exports),
    toArray: function (e, t) {
      if (Array.isArray(e)) return e.slice()
      if (!e) return []
      var s = []
      if ('string' == typeof e)
        if (t) {
          if ('hex' === t)
            for (
              (e = e.replace(/[^a-z0-9]+/gi, '')).length % 2 != 0 && (e = '0' + e), n = 0;
              n < e.length;
              n += 2
            )
              s.push(parseInt(e[n] + e[n + 1], 16))
        } else
          for (var i = 0, n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n)
            r < 128
              ? (s[i++] = r)
              : r < 2048
                ? ((s[i++] = (r >> 6) | 192), (s[i++] = (63 & r) | 128))
                : Di(e, n)
                  ? ((r = 65536 + ((1023 & r) << 10) + (1023 & e.charCodeAt(++n))),
                    (s[i++] = (r >> 18) | 240),
                    (s[i++] = ((r >> 12) & 63) | 128),
                    (s[i++] = ((r >> 6) & 63) | 128),
                    (s[i++] = (63 & r) | 128))
                  : ((s[i++] = (r >> 12) | 224),
                    (s[i++] = ((r >> 6) & 63) | 128),
                    (s[i++] = (63 & r) | 128))
          }
      else for (n = 0; n < e.length; n++) s[n] = 0 | e[n]
      return s
    },
    toHex: function (e) {
      for (var t = '', s = 0; s < e.length; s++) t += Fi(e[s].toString(16))
      return t
    },
    htonl: Bi,
    toHex32: function (e, t) {
      for (var s = '', i = 0; i < e.length; i++) {
        var n = e[i]
        'little' === t && (n = Bi(n)), (s += Wi(n.toString(16)))
      }
      return s
    },
    zero2: Fi,
    zero8: Wi,
    join32: function (e, t, s, i) {
      var n = s - t
      Oi(n % 4 == 0)
      for (var r = new Array(n / 4), a = 0, o = t; a < r.length; a++, o += 4) {
        var h
        ;(h =
          'big' === i
            ? (e[o] << 24) | (e[o + 1] << 16) | (e[o + 2] << 8) | e[o + 3]
            : (e[o + 3] << 24) | (e[o + 2] << 16) | (e[o + 1] << 8) | e[o]),
          (r[a] = h >>> 0)
      }
      return r
    },
    split32: function (e, t) {
      for (var s = new Array(4 * e.length), i = 0, n = 0; i < e.length; i++, n += 4) {
        var r = e[i]
        'big' === t
          ? ((s[n] = r >>> 24),
            (s[n + 1] = (r >>> 16) & 255),
            (s[n + 2] = (r >>> 8) & 255),
            (s[n + 3] = 255 & r))
          : ((s[n + 3] = r >>> 24),
            (s[n + 2] = (r >>> 16) & 255),
            (s[n + 1] = (r >>> 8) & 255),
            (s[n] = 255 & r))
      }
      return s
    },
    rotr32: function (e, t) {
      return (e >>> t) | (e << (32 - t))
    },
    rotl32: function (e, t) {
      return (e << t) | (e >>> (32 - t))
    },
    sum32: function (e, t) {
      return (e + t) >>> 0
    },
    sum32_3: function (e, t, s) {
      return (e + t + s) >>> 0
    },
    sum32_4: function (e, t, s, i) {
      return (e + t + s + i) >>> 0
    },
    sum32_5: function (e, t, s, i, n) {
      return (e + t + s + i + n) >>> 0
    },
    sum64: function (e, t, s, i) {
      var n = e[t],
        r = (i + e[t + 1]) >>> 0,
        a = (r < i ? 1 : 0) + s + n
      ;(e[t] = a >>> 0), (e[t + 1] = r)
    },
    sum64_hi: function (e, t, s, i) {
      return (((t + i) >>> 0 < t ? 1 : 0) + e + s) >>> 0
    },
    sum64_lo: function (e, t, s, i) {
      return (t + i) >>> 0
    },
    sum64_4_hi: function (e, t, s, i, n, r, a, o) {
      var h = 0,
        l = t
      return (
        (h += (l = (l + i) >>> 0) < t ? 1 : 0),
        (h += (l = (l + r) >>> 0) < r ? 1 : 0),
        (e + s + n + a + (h += (l = (l + o) >>> 0) < o ? 1 : 0)) >>> 0
      )
    },
    sum64_4_lo: function (e, t, s, i, n, r, a, o) {
      return (t + i + r + o) >>> 0
    },
    sum64_5_hi: function (e, t, s, i, n, r, a, o, h, l) {
      var c = 0,
        u = t
      return (
        (c += (u = (u + i) >>> 0) < t ? 1 : 0),
        (c += (u = (u + r) >>> 0) < r ? 1 : 0),
        (c += (u = (u + o) >>> 0) < o ? 1 : 0),
        (e + s + n + a + h + (c += (u = (u + l) >>> 0) < l ? 1 : 0)) >>> 0
      )
    },
    sum64_5_lo: function (e, t, s, i, n, r, a, o, h, l) {
      return (t + i + r + o + l) >>> 0
    },
    rotr64_hi: function (e, t, s) {
      return ((t << (32 - s)) | (e >>> s)) >>> 0
    },
    rotr64_lo: function (e, t, s) {
      return ((e << (32 - s)) | (t >>> s)) >>> 0
    },
    shr64_hi: function (e, t, s) {
      return e >>> s
    },
    shr64_lo: function (e, t, s) {
      return ((e << (32 - s)) | (t >>> s)) >>> 0
    }
  }
  function ji() {
    ;(this.pending = null),
      (this.pendingTotal = 0),
      (this.blockSize = this.constructor.blockSize),
      (this.outSize = this.constructor.outSize),
      (this.hmacStrength = this.constructor.hmacStrength),
      (this.padLength = this.constructor.padLength / 8),
      (this.endian = 'big'),
      (this._delta8 = this.blockSize / 8),
      (this._delta32 = this.blockSize / 32)
  }
  var zi = ji
  ;(ji.prototype.update = function (e, t) {
    if (
      ((e = Ui.toArray(e, t)),
      this.pending ? (this.pending = this.pending.concat(e)) : (this.pending = e),
      (this.pendingTotal += e.length),
      this.pending.length >= this._delta8)
    ) {
      var s = (e = this.pending).length % this._delta8
      ;(this.pending = e.slice(e.length - s, e.length)),
        0 === this.pending.length && (this.pending = null),
        (e = Ui.join32(e, 0, e.length - s, this.endian))
      for (var i = 0; i < e.length; i += this._delta32) this._update(e, i, i + this._delta32)
    }
    return this
  }),
    (ji.prototype.digest = function (e) {
      return this.update(this._pad()), Oi(null === this.pending), this._digest(e)
    }),
    (ji.prototype._pad = function () {
      var e = this.pendingTotal,
        t = this._delta8,
        s = t - ((e + this.padLength) % t),
        i = new Array(s + this.padLength)
      i[0] = 128
      for (var n = 1; n < s; n++) i[n] = 0
      if (((e <<= 3), 'big' === this.endian)) {
        for (var r = 8; r < this.padLength; r++) i[n++] = 0
        ;(i[n++] = 0),
          (i[n++] = 0),
          (i[n++] = 0),
          (i[n++] = 0),
          (i[n++] = (e >>> 24) & 255),
          (i[n++] = (e >>> 16) & 255),
          (i[n++] = (e >>> 8) & 255),
          (i[n++] = 255 & e)
      } else
        for (
          i[n++] = 255 & e,
            i[n++] = (e >>> 8) & 255,
            i[n++] = (e >>> 16) & 255,
            i[n++] = (e >>> 24) & 255,
            i[n++] = 0,
            i[n++] = 0,
            i[n++] = 0,
            i[n++] = 0,
            r = 8;
          r < this.padLength;
          r++
        )
          i[n++] = 0
      return i
    })
  var Gi = { BlockHash: zi },
    Hi = Ui.rotr32
  function qi(e, t, s) {
    return (e & t) ^ (~e & s)
  }
  function Ki(e, t, s) {
    return (e & t) ^ (e & s) ^ (t & s)
  }
  var Xi = qi,
    Yi = Ki,
    Qi = function (e) {
      return Hi(e, 2) ^ Hi(e, 13) ^ Hi(e, 22)
    },
    Ji = function (e) {
      return Hi(e, 6) ^ Hi(e, 11) ^ Hi(e, 25)
    },
    Zi = function (e) {
      return Hi(e, 7) ^ Hi(e, 18) ^ (e >>> 3)
    },
    en = function (e) {
      return Hi(e, 17) ^ Hi(e, 19) ^ (e >>> 10)
    },
    tn = Ui.sum32,
    sn = Ui.sum32_4,
    nn = Ui.sum32_5,
    rn = Xi,
    an = Yi,
    on = Qi,
    hn = Ji,
    ln = Zi,
    cn = en,
    un = Gi.BlockHash,
    pn = [
      1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221,
      3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580,
      3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
      2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895,
      666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
      2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
      430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
      1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298
    ]
  function dn() {
    if (!(this instanceof dn)) return new dn()
    un.call(this),
      (this.h = [
        1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635,
        1541459225
      ]),
      (this.k = pn),
      (this.W = new Array(64))
  }
  Ui.inherits(dn, un)
  var fn = dn
  ;(dn.blockSize = 512),
    (dn.outSize = 256),
    (dn.hmacStrength = 192),
    (dn.padLength = 64),
    (dn.prototype._update = function (e, t) {
      for (var s = this.W, i = 0; i < 16; i++) s[i] = e[t + i]
      for (; i < s.length; i++) s[i] = sn(cn(s[i - 2]), s[i - 7], ln(s[i - 15]), s[i - 16])
      var n = this.h[0],
        r = this.h[1],
        a = this.h[2],
        o = this.h[3],
        h = this.h[4],
        l = this.h[5],
        c = this.h[6],
        u = this.h[7]
      for (Oi(this.k.length === s.length), i = 0; i < s.length; i++) {
        var p = nn(u, hn(h), rn(h, l, c), this.k[i], s[i]),
          d = tn(on(n), an(n, r, a))
        ;(u = c), (c = l), (l = h), (h = tn(o, p)), (o = a), (a = r), (r = n), (n = tn(p, d))
      }
      ;(this.h[0] = tn(this.h[0], n)),
        (this.h[1] = tn(this.h[1], r)),
        (this.h[2] = tn(this.h[2], a)),
        (this.h[3] = tn(this.h[3], o)),
        (this.h[4] = tn(this.h[4], h)),
        (this.h[5] = tn(this.h[5], l)),
        (this.h[6] = tn(this.h[6], c)),
        (this.h[7] = tn(this.h[7], u))
    }),
    (dn.prototype._digest = function (e) {
      return 'hex' === e ? Ui.toHex32(this.h, 'big') : Ui.split32(this.h, 'big')
    })
  const mn = () => fn(),
    gn = { amd: xn, cjs: xn, es: yn, iife: xn, system: yn, umd: xn }
  function yn(e, t, s, i, n, r, a, o) {
    for (const t of s.dependencies)
      (n || t instanceof De) && (t.variableName = $(t.suggestedVariableName, e))
    for (const s of t) {
      const t = s.module,
        i = s.name
      s.isNamespace && (n || t instanceof De)
        ? s.setRenderNames(null, (t instanceof De ? t : a.get(t)).variableName)
        : t instanceof De && 'default' === i
          ? s.setRenderNames(
              null,
              $(
                [...t.exportedVariables].some(([e, t]) => '*' === t && e.included)
                  ? t.suggestedVariableName + '__default'
                  : t.suggestedVariableName,
                e
              )
            )
          : s.setRenderNames(null, $(i, e))
    }
    for (const t of o) t.setRenderNames(null, $(t.name, e))
  }
  function xn(
    e,
    t,
    { deconflictedDefault: s, deconflictedNamespace: i, dependencies: n },
    r,
    a,
    o,
    h
  ) {
    for (const t of n) t.variableName = $(t.suggestedVariableName, e)
    for (const t of i) t.namespaceVariableName = $(t.suggestedVariableName + '__namespace', e)
    for (const t of s)
      i.has(t) && Mt(String(r(t.id)), o)
        ? (t.defaultVariableName = t.namespaceVariableName)
        : (t.defaultVariableName = $(t.suggestedVariableName + '__default', e))
    for (const e of t) {
      const t = e.module
      if (t instanceof De) {
        const s = e.name
        if ('default' === s) {
          const s = String(r(t.id)),
            i = Nt[s] ? t.defaultVariableName : t.variableName
          Tt(s, o) ? e.setRenderNames(i, 'default') : e.setRenderNames(null, i)
        } else
          '*' === s
            ? e.setRenderNames(null, Lt[String(r(t.id))] ? t.namespaceVariableName : t.variableName)
            : e.setRenderNames(t.variableName, null)
      } else {
        const s = h.get(t)
        a && e.isNamespace
          ? e.setRenderNames(
              null,
              'default' === s.exportMode ? s.namespaceVariableName : s.variableName
            )
          : 'default' === s.exportMode
            ? e.setRenderNames(null, s.variableName)
            : e.setRenderNames(s.variableName, s.getVariableExportName(e))
      }
    }
  }
  const vn = /[\\'\r\n\u2028\u2029]/,
    En = /(['\r\n\u2028\u2029])/g,
    bn = /\\/g
  function Sn(e) {
    return e.match(vn) ? e.replace(bn, '\\\\').replace(En, '\\$1') : e
  }
  const _n = (e, t) => (e.execIndex > t.execIndex ? 1 : -1)
  function An(e) {
    e.sort(_n)
  }
  function kn(e, t, s) {
    const i = [Yt(e.id)]
    let n = t
    for (; n !== e; ) i.push(Yt(n.id)), (n = s.get(n))
    return i.push(i[0]), i.reverse(), i
  }
  function Cn(e) {
    const t = e.split('\n'),
      s = t.filter((e) => /^\t+/.test(e)),
      i = t.filter((e) => /^ {2,}/.test(e))
    if (0 === s.length && 0 === i.length) return null
    if (s.length >= i.length) return '\t'
    const n = i.reduce((e, t) => {
      const s = /^ +/.exec(t)[0].length
      return Math.min(s, e)
    }, 1 / 0)
    return new Array(n + 1).join(' ')
  }
  function wn(t) {
    if (!t) return null
    if (('string' == typeof t && (t = JSON.parse(t)), '' === t.mappings))
      return { mappings: [], names: [], sources: [], version: 3 }
    let s
    return (
      (s =
        'string' == typeof t.mappings
          ? (function (t) {
              for (
                var s = [], n = [], r = [0, 0, 0, 0, 0], a = 0, o = 0, h = 0, l = 0;
                o < t.length;
                o++
              ) {
                var c = t.charCodeAt(o)
                if (44 === c) i(n, r, a), (a = 0)
                else if (59 === c) i(n, r, a), (a = 0), s.push(n), (n = []), (r[0] = 0)
                else {
                  var u = e[c]
                  if (void 0 === u)
                    throw new Error('Invalid character (' + String.fromCharCode(c) + ')')
                  var p = 32 & u
                  if (((l += (u &= 31) << h), p)) h += 5
                  else {
                    var d = 1 & l
                    ;(l >>>= 1),
                      d && (l = 0 === l ? -2147483648 : -l),
                      (r[a] += l),
                      a++,
                      (l = h = 0)
                  }
                }
              }
              return i(n, r, a), s.push(n), s
            })(t.mappings)
          : t.mappings),
      { ...t, mappings: s }
    )
  }
  function Pn(e, t, s, i) {
    return (
      'function' == typeof e && (e = e(i())),
      Qt(e)
        ? e.replace(/\[(\w+)\]/g, (e, i) => {
            if (!s.hasOwnProperty(i))
              return Jt(os(`"[${i}]" is not a valid placeholder in "${t}" pattern.`))
            const n = s[i]()
            return Qt(n)
              ? n
              : Jt(
                  os(
                    `Invalid substitution "${n}" for placeholder "[${i}]" in "${t}" pattern, can be neither absolute nor relative path.`
                  )
                )
          })
        : Jt(
            os(
              `Invalid pattern "${e}" for "${t}", patterns can be neither absolute nor relative paths and must not contain invalid characters.`
            )
          )
    )
  }
  function In(e, t) {
    const s = new Set(Object.keys(t).map((e) => e.toLowerCase()))
    if (!s.has(e.toLocaleLowerCase())) return e
    const i = $e(e)
    e = e.substr(0, e.length - i.length)
    let n,
      r = 1
    for (; s.has((n = e + ++r + i).toLowerCase()); );
    return n
  }
  const Nn = ['.js', '.jsx', '.ts', '.tsx']
  function Tn(e, t, s, i) {
    return (
      ('function' == typeof t ? t(e.id) : t[e.id]) ||
      (s
        ? (i({
            code: 'MISSING_GLOBAL_NAME',
            guess: e.variableName,
            message: `No name was provided for external module '${e.id}' in output.globals – guessing '${e.variableName}'`,
            source: e.id
          }),
          e.variableName)
        : void 0)
    )
  }
  class Ln {
    constructor(e, t, s, i, n, r, a, o, h, l) {
      ;(this.orderedModules = e),
        (this.inputOptions = t),
        (this.outputOptions = s),
        (this.unsetOptions = i),
        (this.pluginDriver = n),
        (this.modulesById = r),
        (this.chunkByModule = a),
        (this.facadeChunkByModule = o),
        (this.includedNamespaces = h),
        (this.manualChunkAlias = l),
        (this.entryModules = []),
        (this.exportMode = 'named'),
        (this.facadeModule = null),
        (this.id = null),
        (this.namespaceVariableName = ''),
        (this.variableName = ''),
        (this.accessedGlobalsByScope = new Map()),
        (this.dependencies = new Set()),
        (this.dynamicDependencies = new Set()),
        (this.dynamicEntryModules = []),
        (this.exportNamesByVariable = new Map()),
        (this.exports = new Set()),
        (this.exportsByName = Object.create(null)),
        (this.fileName = null),
        (this.implicitEntryModules = []),
        (this.implicitlyLoadedBefore = new Set()),
        (this.imports = new Set()),
        (this.indentString = void 0),
        (this.isEmpty = !0),
        (this.name = null),
        (this.needsExportsShim = !1),
        (this.renderedDependencies = null),
        (this.renderedExports = null),
        (this.renderedHash = void 0),
        (this.renderedModules = Object.create(null)),
        (this.renderedModuleSources = new Map()),
        (this.renderedSource = null),
        (this.sortedExportNames = null),
        (this.strictFacade = !1),
        (this.usedModules = void 0),
        (this.execIndex = e.length > 0 ? e[0].execIndex : 1 / 0)
      const c = new Set(e)
      for (const t of e) {
        t.namespace.included && h.add(t),
          this.isEmpty && t.isIncluded() && (this.isEmpty = !1),
          (t.isEntryPoint || s.preserveModules) && this.entryModules.push(t)
        for (const e of t.includedDynamicImporters)
          c.has(e) ||
            (this.dynamicEntryModules.push(t),
            t.syntheticNamedExports &&
              !s.preserveModules &&
              (h.add(t), this.exports.add(t.namespace)))
        t.implicitlyLoadedAfter.size > 0 && this.implicitEntryModules.push(t)
      }
      this.suggestedVariableName = we(this.generateVariableName())
    }
    static generateFacade(e, t, s, i, n, r, a, o, h, l) {
      const c = new Ln([], e, t, s, i, n, r, a, o, null)
      c.assignFacadeName(l, h), a.has(h) || a.set(h, c)
      for (const e of h.getDependenciesToBeIncluded())
        c.dependencies.add(e instanceof Ni ? r.get(e) : e)
      return (
        !c.dependencies.has(r.get(h)) &&
          h.moduleSideEffects &&
          h.hasEffects() &&
          c.dependencies.add(r.get(h)),
        c.ensureReexportsAreAvailableForModule(h),
        (c.facadeModule = h),
        (c.strictFacade = !0),
        c
      )
    }
    canModuleBeFacade(e, t) {
      const s = e.getExportNamesByVariable()
      for (const t of this.exports)
        if (!s.has(t))
          return (
            0 === s.size &&
              e.isUserDefinedEntryPoint &&
              'strict' === e.preserveSignature &&
              this.unsetOptions.has('preserveEntrySignatures') &&
              this.inputOptions.onwarn({
                code: 'EMPTY_FACADE',
                id: e.id,
                message: `To preserve the export signature of the entry module "${Yt(e.id)}", an empty facade chunk was created. This often happens when creating a bundle for a web app where chunks are placed in script tags and exports are ignored. In this case it is recommended to set "preserveEntrySignatures: false" to avoid this and reduce the number of chunks. Otherwise if this is intentional, set "preserveEntrySignatures: 'strict'" explicitly to silence this warning.`,
                url: 'https://rollupjs.org/guide/en/#preserveentrysignatures'
              }),
            !1
          )
      for (const i of t) if (!s.has(i) && i.module !== e) return !1
      return !0
    }
    generateExports() {
      this.sortedExportNames = null
      const e = new Set(this.exports)
      if (
        null !== this.facadeModule &&
        (!1 !== this.facadeModule.preserveSignature || this.strictFacade)
      ) {
        const t = this.facadeModule.getExportNamesByVariable()
        for (const [s, i] of t) {
          this.exportNamesByVariable.set(s, [...i])
          for (const e of i) this.exportsByName[e] = s
          e.delete(s)
        }
      }
      this.outputOptions.minifyInternalExports
        ? (function (e, t, s) {
            let i = 0
            for (const n of e) {
              let e = n.name[0]
              if (t[e])
                do {
                  ;(e = M(++i)),
                    49 === e.charCodeAt(0) && ((i += 9 * 64 ** (e.length - 1)), (e = M(i)))
                } while (R[e] || t[e])
              ;(t[e] = n), s.set(n, [e])
            }
          })(e, this.exportsByName, this.exportNamesByVariable)
        : (function (e, t, s) {
            for (const i of e) {
              let e = 0,
                n = i.name
              for (; t[n]; ) n = i.name + '$' + ++e
              ;(t[n] = i), s.set(i, [n])
            }
          })(e, this.exportsByName, this.exportNamesByVariable),
        (this.outputOptions.preserveModules ||
          (this.facadeModule && this.facadeModule.isEntryPoint)) &&
          (this.exportMode = (function (e, { exports: t, name: s, format: i }, n, r, a) {
            const o = e.getExportNames()
            if ('default' === t) {
              if (1 !== o.length || 'default' !== o[0]) return Jt(ss('default', o, r))
            } else if ('none' === t && o.length) return Jt(ss('none', o, r))
            return (
              'auto' === t &&
                (0 === o.length
                  ? (t = 'none')
                  : 1 === o.length && 'default' === o[0]
                    ? ('cjs' === i &&
                        n.has('exports') &&
                        a(
                          (function (e) {
                            const t = Yt(e)
                            return {
                              code: es.PREFER_NAMED_EXPORTS,
                              id: e,
                              message: `Entry module "${t}" is implicitly using "default" export mode, which means for CommonJS output that its default export is assigned to "module.exports". For many tools, such CommonJS output will not be interchangeable with the original ES module. If this is intended, explicitly set "output.exports" to either "auto" or "default", otherwise you might want to consider changing the signature of "${t}" to use named exports only.`,
                              url: 'https://rollupjs.org/guide/en/#outputexports'
                            }
                          })(r)
                        ),
                      (t = 'default'))
                    : ('es' !== i &&
                        -1 !== o.indexOf('default') &&
                        a(
                          (function (e, t) {
                            return {
                              code: es.MIXED_EXPORTS,
                              id: e,
                              message: `Entry module "${Yt(e)}" is using named and default exports together. Consumers of your bundle will have to use \`${t || 'chunk'}["default"]\` to access the default export, which may not be what you want. Use \`output.exports: "named"\` to disable this warning`,
                              url: 'https://rollupjs.org/guide/en/#outputexports'
                            }
                          })(r, s)
                        ),
                      (t = 'named'))),
              t
            )
          })(
            this,
            this.outputOptions,
            this.unsetOptions,
            this.facadeModule.id,
            this.inputOptions.onwarn
          ))
    }
    generateFacades() {
      var e
      const t = [],
        s = new Set([...this.entryModules, ...this.implicitEntryModules]),
        i = new Set(this.dynamicEntryModules.map((e) => e.namespace))
      for (const e of s)
        if (e.preserveSignature) for (const t of e.getExportNamesByVariable().keys()) i.add(t)
      for (const e of s) {
        const s = Array.from(e.userChunkNames, (e) => ({ name: e }))
        0 === s.length && e.isUserDefinedEntryPoint && s.push({}),
          s.push(...Array.from(e.chunkFileNames, (e) => ({ fileName: e }))),
          0 === s.length && s.push({}),
          this.facadeModule ||
            (!this.outputOptions.preserveModules &&
              'strict' === e.preserveSignature &&
              !this.canModuleBeFacade(e, i)) ||
            ((this.facadeModule = e),
            this.facadeChunkByModule.set(e, this),
            e.preserveSignature &&
              ((this.strictFacade = 'strict' === e.preserveSignature),
              this.ensureReexportsAreAvailableForModule(e)),
            this.assignFacadeName(s.shift(), e))
        for (const i of s)
          t.push(
            Ln.generateFacade(
              this.inputOptions,
              this.outputOptions,
              this.unsetOptions,
              this.pluginDriver,
              this.modulesById,
              this.chunkByModule,
              this.facadeChunkByModule,
              this.includedNamespaces,
              e,
              i
            )
          )
      }
      for (const t of this.dynamicEntryModules)
        t.syntheticNamedExports ||
          (!this.facadeModule && this.canModuleBeFacade(t, i)
            ? ((this.facadeModule = t),
              this.facadeChunkByModule.set(t, this),
              (this.strictFacade = !0),
              this.assignFacadeName({}, t))
            : this.facadeModule === t && !this.strictFacade && this.canModuleBeFacade(t, i)
              ? (this.strictFacade = !0)
              : (null === (e = this.facadeChunkByModule.get(t)) || void 0 === e
                  ? void 0
                  : e.strictFacade) ||
                (this.includedNamespaces.add(t), this.exports.add(t.namespace)))
      return t
    }
    generateId(e, t, s, i) {
      if (null !== this.fileName) return this.fileName
      const [n, r] =
        this.facadeModule && this.facadeModule.isUserDefinedEntryPoint
          ? [t.entryFileNames, 'output.entryFileNames']
          : [t.chunkFileNames, 'output.chunkFileNames']
      return In(
        Pn(
          n,
          r,
          {
            format: () => t.format,
            hash: () => (i ? this.computeContentHashWithDependencies(e, t, s) : '[hash]'),
            name: () => this.getChunkName()
          },
          this.getChunkInfo.bind(this)
        ),
        s
      )
    }
    generateIdPreserveModules(e, t, s, i) {
      const n = this.orderedModules[0].id,
        r = Kt(n)
      let a
      if (Ne(n)) {
        const s = $e(n),
          o = i.has('entryFileNames')
            ? Nn.includes(s)
              ? '[name].js'
              : '[name][extname].js'
            : t.entryFileNames,
          h = `${Re(r)}/${Pn(o, 'output.entryFileNames', { ext: () => s.substr(1), extname: () => s, format: () => t.format, name: () => this.getChunkName() }, this.getChunkInfo.bind(this))}`,
          { preserveModulesRoot: l } = t
        a = l && h.startsWith(l) ? h.slice(l.length).replace(/^[\\/]/, '') : E(e, h)
      } else a = '_virtual/' + Me(r)
      return In(Le(a), s)
    }
    getChunkInfo() {
      const e = this.facadeModule,
        t = this.getChunkName.bind(this)
      return {
        exports: this.getExportNames(),
        facadeModuleId: e && e.id,
        isDynamicEntry: this.dynamicEntryModules.length > 0,
        isEntry: null !== e && e.isEntryPoint,
        isImplicitEntry: this.implicitEntryModules.length > 0,
        modules: this.renderedModules,
        get name() {
          return t()
        },
        type: 'chunk'
      }
    }
    getChunkInfoWithFileNames() {
      return Object.assign(this.getChunkInfo(), {
        code: void 0,
        dynamicImports: Array.from(this.dynamicDependencies, ri),
        fileName: this.id,
        implicitlyLoadedBefore: Array.from(this.implicitlyLoadedBefore, ri),
        importedBindings: this.getImportedBindingsPerDependency(),
        imports: Array.from(this.dependencies, ri),
        map: void 0,
        referencedFiles: this.getReferencedFiles()
      })
    }
    getChunkName() {
      return this.name || (this.name = Kt(this.getFallbackChunkName()))
    }
    getExportNames() {
      return (
        this.sortedExportNames || (this.sortedExportNames = Object.keys(this.exportsByName).sort())
      )
    }
    getRenderedHash() {
      if (this.renderedHash) return this.renderedHash
      const e = mn(),
        t = this.pluginDriver.hookReduceValueSync(
          'augmentChunkHash',
          '',
          [this.getChunkInfo()],
          (e, t) => (t && (e += t), e)
        )
      return (
        e.update(t),
        e.update(this.renderedSource.toString()),
        e.update(
          this.getExportNames()
            .map((e) => {
              const t = this.exportsByName[e]
              return `${Yt(t.module.id).replace(/\\/g, '/')}:${t.name}:${e}`
            })
            .join(',')
        ),
        (this.renderedHash = e.digest('hex'))
      )
    }
    getVariableExportName(e) {
      return this.outputOptions.preserveModules && e instanceof kt
        ? '*'
        : this.exportNamesByVariable.get(e)[0]
    }
    link() {
      for (const e of this.orderedModules)
        this.addDependenciesToChunk(e.getDependenciesToBeIncluded(), this.dependencies),
          this.addDependenciesToChunk(e.dynamicDependencies, this.dynamicDependencies),
          this.addDependenciesToChunk(e.implicitlyLoadedBefore, this.implicitlyLoadedBefore),
          this.setUpChunkImportsAndExportsForModule(e)
    }
    preRender(e, t) {
      const s = new v({ separator: e.compact ? '' : '\n\n' })
      ;(this.usedModules = []),
        (this.indentString = (function (e, t) {
          if (!0 !== t.indent) return t.indent
          for (let t = 0; t < e.length; t++) {
            const s = Cn(e[t].originalCode)
            if (null !== s) return s
          }
          return '\t'
        })(this.orderedModules, e))
      const i = e.compact ? '' : '\n',
        n = e.compact ? '' : ' ',
        r = {
          compact: e.compact,
          dynamicImportFunction: e.dynamicImportFunction,
          exportNamesByVariable: this.exportNamesByVariable,
          format: e.format,
          freeze: e.freeze,
          indent: this.indentString,
          namespaceToStringTag: e.namespaceToStringTag,
          outputPluginDriver: this.pluginDriver,
          varOrConst: e.preferConst ? 'const' : 'var'
        }
      if (
        e.hoistTransitiveImports &&
        !this.outputOptions.preserveModules &&
        null !== this.facadeModule
      )
        for (const e of this.dependencies) e instanceof Ln && this.inlineChunkDependencies(e)
      const a = [...this.dependencies]
      An(a),
        (this.dependencies = new Set(a)),
        this.prepareDynamicImportsAndImportMetas(),
        this.setIdentifierRenderResolutions(e)
      let o = ''
      const h = this.renderedModules
      for (const t of this.orderedModules) {
        let n = 0
        if (t.isIncluded() || this.includedNamespaces.has(t)) {
          const a = t.render(r).trim()
          ;(n = a.length()),
            n &&
              (e.compact && -1 !== a.lastLine().indexOf('//') && a.append('\n'),
              this.renderedModuleSources.set(t, a),
              s.addSource(a),
              this.usedModules.push(t))
          const h = t.namespace
          if (this.includedNamespaces.has(t) && !this.outputOptions.preserveModules) {
            const e = h.renderBlock(r)
            h.renderFirst() ? (o += i + e) : s.addSource(new y(e))
          }
        }
        const { renderedExports: a, removedExports: l } = t.getRenderedExports()
        h[t.id] = {
          originalLength: t.originalCode.length,
          removedExports: l,
          renderedExports: a,
          renderedLength: n
        }
      }
      if (
        (o && s.prepend(o + i + i),
        this.needsExportsShim &&
          s.prepend(`${i}${r.varOrConst} _missingExportShim${n}=${n}void 0;${i}${i}`),
        e.compact ? (this.renderedSource = s) : (this.renderedSource = s.trim()),
        (this.renderedHash = void 0),
        this.isEmpty && 0 === this.getExportNames().length && 0 === this.dependencies.size)
      ) {
        const e = this.getChunkName()
        this.inputOptions.onwarn({
          chunkName: e,
          code: 'EMPTY_BUNDLE',
          message: `Generated an empty chunk: "${e}"`
        })
      }
      this.setExternalRenderPaths(e, t),
        (this.renderedDependencies = this.getChunkDependencyDeclarations(e)),
        (this.renderedExports =
          'none' === this.exportMode ? [] : this.getChunkExportDeclarations(e.format))
    }
    async render(e, t, s) {
      _i('render format', 2)
      const i = e.format,
        n = vs[i]
      e.dynamicImportFunction &&
        'es' !== i &&
        this.inputOptions.onwarn({
          code: 'INVALID_OPTION',
          message: '"output.dynamicImportFunction" is ignored for formats other than "es".'
        })
      for (const e of this.dependencies) {
        const t = this.renderedDependencies.get(e)
        if (e instanceof De) {
          const s = e.renderPath
          t.id = Sn(e.renormalizeRenderPath ? this.getRelativePath(s, !1) : s)
        } else
          (t.namedExportsMode = 'default' !== e.exportMode),
            (t.id = Sn(this.getRelativePath(e.id, !1)))
      }
      this.finaliseDynamicImports(e), this.finaliseImportMetas(i)
      const r =
        0 !== this.renderedExports.length ||
        [...this.renderedDependencies.values()].some((e) => e.reexports && 0 !== e.reexports.length)
      let a = !1
      const o = new Set()
      for (const e of this.orderedModules) {
        e.usesTopLevelAwait && (a = !0)
        const t = this.accessedGlobalsByScope.get(e.scope)
        if (t) for (const e of t) o.add(e)
      }
      if (a && 'es' !== i && 'system' !== i)
        return Jt({
          code: 'INVALID_TLA_FORMAT',
          message: `Module format ${i} does not support top-level await. Use the "es" or "system" output formats rather.`
        })
      const l = n(
        this.renderedSource,
        {
          accessedGlobals: o,
          dependencies: [...this.renderedDependencies.values()],
          exports: this.renderedExports,
          hasExports: r,
          indentString: this.indentString,
          intro: t.intro,
          isEntryModuleFacade:
            this.outputOptions.preserveModules ||
            (null !== this.facadeModule && this.facadeModule.isEntryPoint),
          namedExportsMode: 'default' !== this.exportMode,
          outro: t.outro,
          usesTopLevelAwait: a,
          varOrConst: e.preferConst ? 'const' : 'var',
          warn: this.inputOptions.onwarn
        },
        e
      )
      t.banner && l.prepend(t.banner), t.footer && l.append(t.footer)
      const c = l.toString()
      Ai('render format', 2)
      let u = null
      const p = []
      let d = await (function ({
        code: e,
        options: t,
        outputPluginDriver: s,
        renderChunk: i,
        sourcemapChain: n
      }) {
        return s.hookReduceArg0('renderChunk', [e, i, t], (e, t, s) => {
          if (null == t) return e
          if (('string' == typeof t && (t = { code: t, map: void 0 }), null !== t.map)) {
            const e = wn(t.map)
            n.push(e || { missing: !0, plugin: s.name })
          }
          return t.code
        })
      })({
        code: c,
        options: e,
        outputPluginDriver: this.pluginDriver,
        renderChunk: s,
        sourcemapChain: p
      })
      if (e.sourcemap) {
        let t
        _i('sourcemap', 2),
          (t = e.file ? Ve(e.sourcemapFile || e.file) : e.dir ? Ve(e.dir, this.id) : Ve(this.id))
        const s = l.generateDecodedMap({})
        ;(u = (function (e, t, s, i, n, r) {
          const a = Mi(r),
            o = s
              .filter((e) => !e.excludeFromSourcemap)
              .map((e) => Ri(e.id, e.originalCode, e.originalSourcemap, e.sourcemapChain, a))
          let l = new Li(t, o)
          l = i.reduce(a, l)
          let { sources: c, sourcesContent: u, names: p, mappings: d } = l.traceMappings()
          if (e) {
            const t = Re(e)
            ;(c = c.map((e) => Oe(t, e))), (e = Me(e))
          }
          return (
            (u = n ? null : u),
            new h({ file: e, sources: c, sourcesContent: u, names: p, mappings: d })
          )
        })(t, s, this.usedModules, p, e.sourcemapExcludeSources, this.inputOptions.onwarn)),
          (u.sources = u.sources
            .map((s) => {
              const { sourcemapPathTransform: i } = e
              if (i) {
                const e = i(s, t + '.map')
                return (
                  'string' != typeof e &&
                    Jt(os('sourcemapPathTransform function must return a string.')),
                  e
                )
              }
              return s
            })
            .map(Le)),
          Ai('sourcemap', 2)
      }
      return e.compact || '\n' === d[d.length - 1] || (d += '\n'), { code: d, map: u }
    }
    addDependenciesToChunk(e, t) {
      for (const s of e)
        if (s instanceof Ni) {
          const e = this.chunkByModule.get(s)
          e && e !== this && t.add(e)
        } else t.add(s)
    }
    assignFacadeName({ fileName: e, name: t }, s) {
      e ? (this.fileName = e) : (this.name = Kt(t || s.chunkName || Xt(s.id)))
    }
    computeContentHashWithDependencies(e, t, s) {
      const i = mn()
      i.update([e.intro, e.outro, e.banner, e.footer].map((e) => e || '').join(':')),
        i.update(t.format)
      const n = new Set([this])
      for (const r of n)
        if (
          (r instanceof De
            ? i.update(':' + r.renderPath)
            : (i.update(r.getRenderedHash()), i.update(r.generateId(e, t, s, !1))),
          !(r instanceof De))
        )
          for (const e of [...r.dependencies, ...r.dynamicDependencies]) n.add(e)
      return i.digest('hex').substr(0, 8)
    }
    ensureReexportsAreAvailableForModule(e) {
      const t = e.getExportNamesByVariable()
      for (const e of t.keys()) {
        const t = e instanceof Ct,
          s = t ? e.getBaseVariable() : e
        if (!(s instanceof kt && this.outputOptions.preserveModules)) {
          const e = s.module
          if (e instanceof Ni) {
            const i = this.chunkByModule.get(e)
            i && i !== this && (i.exports.add(s), t && this.imports.add(s))
          }
        }
      }
    }
    finaliseDynamicImports(e) {
      const t = 'amd' === e.format
      for (const [s, i] of this.renderedModuleSources)
        for (const { node: n, resolution: r } of s.dynamicImports) {
          const s = this.chunkByModule.get(r),
            a = this.facadeChunkByModule.get(r)
          if (!r || !n.included || s === this) continue
          const o =
            r instanceof Ni
              ? `'${this.getRelativePath((a || s).id, t)}'`
              : r instanceof De
                ? `'${r.renormalizeRenderPath ? this.getRelativePath(r.renderPath, t) : r.renderPath}'`
                : r
          n.renderFinalResolution(
            i,
            o,
            r instanceof Ni &&
              !(null == a ? void 0 : a.strictFacade) &&
              s.exportNamesByVariable.get(r.namespace)[0],
            e
          )
        }
    }
    finaliseImportMetas(e) {
      for (const [t, s] of this.renderedModuleSources)
        for (const i of t.importMetas) i.renderFinalMechanism(s, this.id, e, this.pluginDriver)
    }
    generateVariableName() {
      if (this.manualChunkAlias) return this.manualChunkAlias
      const e =
        this.entryModules[0] ||
        this.implicitEntryModules[0] ||
        this.dynamicEntryModules[0] ||
        this.orderedModules[this.orderedModules.length - 1]
      return e ? e.chunkName || Xt(e.id) : 'chunk'
    }
    getChunkDependencyDeclarations(e) {
      const t = this.getImportSpecifiers(),
        s = this.getReexportSpecifiers(),
        i = new Map()
      for (const n of this.dependencies) {
        const r = t.get(n) || null,
          a = s.get(n) || null,
          o = n instanceof De || 'default' !== n.exportMode
        i.set(n, {
          defaultVariableName: n.defaultVariableName,
          globalName:
            n instanceof De &&
            ('umd' === e.format || 'iife' === e.format) &&
            Tn(n, e.globals, null !== (r || a), this.inputOptions.onwarn),
          id: void 0,
          imports: r,
          isChunk: n instanceof Ln,
          name: n.variableName,
          namedExportsMode: o,
          namespaceVariableName: n.namespaceVariableName,
          reexports: a
        })
      }
      return i
    }
    getChunkExportDeclarations(e) {
      const t = []
      for (const s of this.getExportNames()) {
        if ('*' === s[0]) continue
        const i = this.exportsByName[s]
        if (!(i instanceof Ct)) {
          const e = i.module
          if (e && this.chunkByModule.get(e) !== this) continue
        }
        let n = null,
          r = !1,
          a = !1,
          o = i.getName()
        if (i instanceof Ue) {
          i.init === K && (a = !0)
          for (const e of i.declarations)
            if (e.parent instanceof Et || (e instanceof bt && e.declaration instanceof Et)) {
              r = !0
              break
            }
        } else i instanceof Ct && ((n = o), 'es' === e && 'default' !== s && (o = i.renderName))
        t.push({ exported: s, expression: n, hoisted: r, local: o, uninitialized: a })
      }
      return t
    }
    getDependenciesToBeDeconflicted(e, t, s) {
      const i = new Set(),
        n = new Set(),
        r = new Set()
      for (const t of [...this.exportNamesByVariable.keys(), ...this.imports])
        if (e || t.isNamespace) {
          const a = t.module
          if (a instanceof De)
            i.add(a),
              e &&
                ('default' === t.name
                  ? Nt[String(s(a.id))] && n.add(a)
                  : '*' === t.name && Lt[String(s(a.id))] && r.add(a))
          else {
            const s = this.chunkByModule.get(a)
            s !== this && (i.add(s), e && 'default' === s.exportMode && t.isNamespace && r.add(s))
          }
        }
      if (t) for (const e of this.dependencies) i.add(e)
      return { deconflictedDefault: n, deconflictedNamespace: r, dependencies: i }
    }
    getFallbackChunkName() {
      return this.manualChunkAlias
        ? this.manualChunkAlias
        : this.fileName
          ? Xt(this.fileName)
          : Xt(this.orderedModules[this.orderedModules.length - 1].id)
    }
    getImportedBindingsPerDependency() {
      const e = {}
      for (const [t, s] of this.renderedDependencies) {
        const i = new Set()
        if (s.imports) for (const { imported: e } of s.imports) i.add(e)
        if (s.reexports) for (const { imported: e } of s.reexports) i.add(e)
        e[t.id] = [...i]
      }
      return e
    }
    getImportSpecifiers() {
      const { interop: e } = this.outputOptions,
        t = new Map()
      for (const s of this.imports) {
        const i = s.module
        let n, r
        if (i instanceof De) {
          if (((n = i), (r = s.name), 'default' !== r && '*' !== r && 'defaultOnly' === e(i.id)))
            return Jt(rs(i.id, r, !1))
        } else (n = this.chunkByModule.get(i)), (r = n.getVariableExportName(s))
        V(t, n, () => []).push({ imported: r, local: s.getName() })
      }
      return t
    }
    getReexportSpecifiers() {
      const { externalLiveBindings: e, interop: t } = this.outputOptions,
        s = new Map()
      for (let i of this.getExportNames()) {
        let n,
          r,
          a = !1
        if ('*' === i[0]) {
          const s = i.substr(1)
          'defaultOnly' === t(s) && this.inputOptions.onwarn(as(s)),
            (a = e),
            (n = this.modulesById.get(s)),
            (r = i = '*')
        } else {
          const s = this.exportsByName[i]
          if (s instanceof Ct) continue
          const o = s.module
          if (o instanceof Ni) {
            if (((n = this.chunkByModule.get(o)), n === this)) continue
            ;(r = n.getVariableExportName(s)), (a = s.isReassigned)
          } else {
            if (((n = o), (r = s.name), 'default' !== r && '*' !== r && 'defaultOnly' === t(o.id)))
              return Jt(rs(o.id, r, !0))
            a = e && ('default' !== r || Tt(String(t(o.id)), !0))
          }
        }
        V(s, n, () => []).push({ imported: r, needsLiveBinding: a, reexported: i })
      }
      return s
    }
    getReferencedFiles() {
      const e = []
      for (const t of this.orderedModules)
        for (const s of t.importMetas) {
          const t = s.getReferencedFileName(this.pluginDriver)
          t && e.push(t)
        }
      return e
    }
    getRelativePath(e, t) {
      let s = Le(E(Re(this.id), e))
      return (
        t && s.endsWith('.js') && (s = s.slice(0, -3)),
        '..' === s
          ? '../../' + Me(e)
          : '' === s
            ? '../' + Me(e)
            : s.startsWith('../')
              ? s
              : './' + s
      )
    }
    inlineChunkDependencies(e) {
      for (const t of e.dependencies)
        this.dependencies.has(t) ||
          (this.dependencies.add(t), t instanceof Ln && this.inlineChunkDependencies(t))
    }
    prepareDynamicImportsAndImportMetas() {
      var e
      const t = this.accessedGlobalsByScope
      for (const s of this.orderedModules) {
        for (const { node: i, resolution: n } of s.dynamicImports)
          if (i.included)
            if (n instanceof Ni) {
              const s = this.chunkByModule.get(n)
              s === this
                ? i.setInternalResolution(n.namespace)
                : i.setExternalResolution(
                    (null === (e = this.facadeChunkByModule.get(n)) || void 0 === e
                      ? void 0
                      : e.exportMode) || s.exportMode,
                    n,
                    this.outputOptions,
                    this.pluginDriver,
                    t
                  )
            } else i.setExternalResolution('external', n, this.outputOptions, this.pluginDriver, t)
        for (const e of s.importMetas) e.addAccessedGlobals(this.outputOptions.format, t)
      }
    }
    setExternalRenderPaths(e, t) {
      for (const s of [...this.dependencies, ...this.dynamicDependencies])
        s instanceof De && s.setRenderPath(e, t)
    }
    setIdentifierRenderResolutions({ format: e, interop: t }) {
      const s = new Set()
      for (const t of this.getExportNames()) {
        const i = this.exportsByName[t]
        i instanceof At && (this.needsExportsShim = !0),
          'es' !== e && 'system' !== e && i.isReassigned && !i.isId
            ? i.setRenderNames('exports', t)
            : i instanceof Ct
              ? s.add(i)
              : i.setRenderNames(null, null)
      }
      const i = new Set()
      switch ((this.needsExportsShim && i.add('_missingExportShim'), e)) {
        case 'system':
          i.add('module').add('exports')
          break
        case 'es':
          break
        case 'cjs':
          i.add('module').add('require').add('__filename').add('__dirname')
        default:
          i.add('exports')
          for (const e of Wt) i.add(e)
      }
      !(function (e, t, s, i, n, r, a, o, h, l, c, u, p) {
        for (const t of e) t.scope.addUsedOutsideNames(i, n, c, u)
        !(function (e, t, s) {
          for (const i of t) {
            for (const t of i.scope.variables.values())
              t.included &&
                !(t.renderBaseName || (t instanceof _t && t.getOriginalVariable() !== t)) &&
                t.setRenderNames(null, $(t.name, e))
            if (s.has(i)) {
              const t = i.namespace
              t.setRenderNames(null, $(t.name, e))
            }
          }
        })(i, e, p),
          gn[n](i, s, t, r, a, o, h, l)
        for (const t of e) t.scope.deconflict(n, c, u)
      })(
        this.orderedModules,
        this.getDependenciesToBeDeconflicted(
          'es' !== e && 'system' !== e,
          'amd' === e || 'umd' === e || 'iife' === e,
          t
        ),
        this.imports,
        i,
        e,
        t,
        this.outputOptions.preserveModules,
        this.outputOptions.externalLiveBindings,
        this.chunkByModule,
        s,
        this.exportNamesByVariable,
        this.accessedGlobalsByScope,
        this.includedNamespaces
      )
    }
    setUpChunkImportsAndExportsForModule(e) {
      const t = new Set(e.imports)
      if (!this.outputOptions.preserveModules && this.includedNamespaces.has(e)) {
        const s = e.namespace.getMemberVariables()
        for (const e of Object.keys(s)) t.add(s[e])
      }
      for (let e of t) {
        e instanceof _t && (e = e.getOriginalVariable()),
          e instanceof Ct && (e = e.getBaseVariable())
        const t = this.chunkByModule.get(e.module)
        t !== this &&
          (this.imports.add(e),
          !(e instanceof kt && this.outputOptions.preserveModules) &&
            e.module instanceof Ni &&
            t.exports.add(e))
      }
      ;(this.includedNamespaces.has(e) ||
        (e.isEntryPoint && !1 !== e.preserveSignature) ||
        e.includedDynamicImporters.some((e) => this.chunkByModule.get(e) !== this)) &&
        this.ensureReexportsAreAvailableForModule(e)
      for (const { node: t, resolution: s } of e.dynamicImports)
        t.included &&
          s instanceof Ni &&
          this.chunkByModule.get(s) === this &&
          !this.includedNamespaces.has(s) &&
          (this.includedNamespaces.add(s), this.ensureReexportsAreAvailableForModule(s))
    }
  }
  const Mn = (e, t) => (t ? `${e}\n${t}` : e),
    Rn = (e, t) => (t ? `${e}\n\n${t}` : e)
  function $n(e, t, s) {
    const i = new Set([e])
    for (const e of i) {
      s.add(e), t.push(e)
      for (const t of e.dependencies) t instanceof De || s.has(t) || i.add(t)
    }
  }
  var On
  function Vn(e, t, s) {
    e in t &&
      s(
        (function (e) {
          return {
            code: es.FILE_NAME_CONFLICT,
            message: `The emitted file "${e}" overwrites a previously emitted file of the same name.`
          }
        })(e)
      ),
      (t[e] = Dn)
  }
  !(function (e) {
    ;(e[(e.LOAD_AND_PARSE = 0)] = 'LOAD_AND_PARSE'),
      (e[(e.ANALYSE = 1)] = 'ANALYSE'),
      (e[(e.GENERATE = 2)] = 'GENERATE')
  })(On || (On = {}))
  const Dn = { type: 'placeholder' }
  function Bn(e, t, s) {
    if (!('string' == typeof e || e instanceof Uint8Array)) {
      const e = t.fileName || t.name || s
      return Jt(
        os(
          `Could not set source for ${'string' == typeof e ? `asset "${e}"` : 'unnamed asset'}, asset source needs to be a string, Uint8Array or Buffer.`
        )
      )
    }
    return e
  }
  class Fn {
    constructor(e, t, s) {
      ;(this.graph = e),
        (this.options = t),
        (this.facadeChunkByModule = null),
        (this.output = null),
        (this.assertAssetsFinalized = () => {
          for (const [t, s] of this.filesByReferenceId.entries())
            if ('asset' === s.type && 'string' != typeof s.fileName)
              return Jt(
                ((e = s.name || t),
                {
                  code: es.ASSET_SOURCE_MISSING,
                  message: `Plugin error creating asset "${e}" - no asset source set.`
                })
              )
          var e
        }),
        (this.emitFile = (e) =>
          (function (e) {
            return e && ('asset' === e.type || 'chunk' === e.type)
          })(e)
            ? (function (e) {
                const t = e.fileName || e.name
                return !t || ('string' == typeof t && Qt(t))
              })(e)
              ? 'chunk' === e.type
                ? this.emitChunk(e)
                : this.emitAsset(e)
              : Jt(
                  os(
                    `The "fileName" or "name" properties of emitted files must be strings that are neither absolute nor relative paths and do not contain invalid characters, received "${e.fileName || e.name}".`
                  )
                )
            : Jt(
                os(`Emitted files must be of type "asset" or "chunk", received "${e && e.type}".`)
              )),
        (this.getFileName = (e) => {
          const t = this.filesByReferenceId.get(e)
          return t
            ? 'chunk' === t.type
              ? (function (e, t) {
                  var s, i
                  return (
                    e.fileName ||
                    (e.module &&
                      (null === (s = null == t ? void 0 : t.get(e.module)) || void 0 === s
                        ? void 0
                        : s.id)) ||
                    Jt(
                      ((i = e.fileName || e.name),
                      {
                        code: es.CHUNK_NOT_GENERATED,
                        message: `Plugin error - Unable to get file name for chunk "${i}". Ensure that generate is called first.`
                      })
                    )
                  )
                })(t, this.facadeChunkByModule)
              : (function (e, t) {
                  return 'string' != typeof e.fileName
                    ? Jt(
                        ((s = e.name || t),
                        {
                          code: es.ASSET_NOT_FINALISED,
                          message: `Plugin error - Unable to get file name for asset "${s}". Ensure that the source is set and that generate is called first.`
                        })
                      )
                    : e.fileName
                  var s
                })(t, e)
            : Jt(
                ((s = e),
                {
                  code: es.FILE_NOT_FOUND,
                  message: `Plugin error - Unable to get file name for unknown file "${s}".`
                })
              )
          var s
        }),
        (this.setAssetSource = (e, t) => {
          const s = this.filesByReferenceId.get(e)
          if (!s)
            return Jt(
              ((i = e),
              {
                code: es.ASSET_NOT_FOUND,
                message: `Plugin error - Unable to set the source for unknown asset "${i}".`
              })
            )
          var i, n
          if ('asset' !== s.type)
            return Jt(
              os(`Asset sources can only be set for emitted assets but "${e}" is an emitted chunk.`)
            )
          if (void 0 !== s.source)
            return Jt(
              ((n = s.name || e),
              {
                code: es.ASSET_SOURCE_ALREADY_SET,
                message: `Unable to set the source for asset "${n}", source already set.`
              })
            )
          const r = Bn(t, s, e)
          this.output ? this.finalizeAsset(s, r, e, this.output) : (s.source = r)
        }),
        (this.setOutputBundle = (e, t, s) => {
          ;(this.output = { assetFileNames: t, bundle: e }), (this.facadeChunkByModule = s)
          for (const e of this.filesByReferenceId.values())
            e.fileName && Vn(e.fileName, this.output.bundle, this.options.onwarn)
          for (const [e, t] of this.filesByReferenceId.entries())
            'asset' === t.type &&
              void 0 !== t.source &&
              this.finalizeAsset(t, t.source, e, this.output)
        }),
        (this.filesByReferenceId = s ? new Map(s.filesByReferenceId) : new Map())
    }
    assignReferenceId(e, t) {
      let s
      do {
        const e = mn()
        s ? e.update(s) : e.update(t), (s = e.digest('hex').substr(0, 8))
      } while (this.filesByReferenceId.has(s))
      return this.filesByReferenceId.set(s, e), s
    }
    emitAsset(e) {
      const t = void 0 !== e.source ? Bn(e.source, e, null) : void 0,
        s = { fileName: e.fileName, name: e.name, source: t, type: 'asset' },
        i = this.assignReferenceId(s, e.fileName || e.name || e.type)
      return (
        this.output &&
          (e.fileName && Vn(e.fileName, this.output.bundle, this.options.onwarn),
          void 0 !== t && this.finalizeAsset(s, t, i, this.output)),
        i
      )
    }
    emitChunk(e) {
      if (this.graph.phase > On.LOAD_AND_PARSE)
        return Jt({
          code: es.INVALID_ROLLUP_PHASE,
          message: 'Cannot emit chunks after module loading has finished.'
        })
      if ('string' != typeof e.id)
        return Jt(os(`Emitted chunks need to have a valid string id, received "${e.id}"`))
      const t = { fileName: e.fileName, module: null, name: e.name || e.id, type: 'chunk' }
      return (
        this.graph.moduleLoader
          .emitChunk(e)
          .then((e) => (t.module = e))
          .catch(() => {}),
        this.assignReferenceId(t, e.id)
      )
    }
    finalizeAsset(e, t, s, i) {
      const n =
          e.fileName ||
          (function (e, t) {
            for (const s of Object.keys(e)) {
              const i = e[s]
              if ('asset' === i.type && Wn(t, i.source)) return s
            }
            return null
          })(i.bundle, t) ||
          (function (e, t, s) {
            const i = e || 'asset'
            return In(
              Pn(
                s.assetFileNames,
                'output.assetFileNames',
                {
                  hash() {
                    const e = mn()
                    return e.update(i), e.update(':'), e.update(t), e.digest('hex').substr(0, 8)
                  },
                  ext: () => $e(i).substr(1),
                  extname: () => $e(i),
                  name: () => i.substr(0, i.length - $e(i).length)
                },
                () => ({ name: e, source: t, type: 'asset' })
              ),
              s.bundle
            )
          })(e.name, t, i),
        r = { ...e, source: t, fileName: n }
      this.filesByReferenceId.set(s, r)
      const a = this.options
      i.bundle[n] = {
        fileName: n,
        name: e.name,
        get isAsset() {
          return (
            hs(
              'Accessing "isAsset" on files in the bundle is deprecated, please use "type === \'asset\'" instead',
              !0,
              a
            ),
            !0
          )
        },
        source: t,
        type: 'asset'
      }
    }
  }
  function Wn(e, t) {
    if ('string' == typeof e) return e === t
    if ('string' == typeof t) return !1
    if ('equals' in e) return e.equals(t)
    if (e.length !== t.length) return !1
    for (let s = 0; s < e.length; s++) if (e[s] !== t[s]) return !1
    return !0
  }
  class Un {
    constructor(e, t, s, i, n) {
      ;(this.outputOptions = e),
        (this.unsetOptions = t),
        (this.inputOptions = s),
        (this.pluginDriver = i),
        (this.graph = n),
        (this.facadeChunkByModule = new Map()),
        (this.includedNamespaces = new Set())
    }
    async generate(e) {
      _i('GENERATE', 1)
      const t = Object.create(null)
      this.pluginDriver.setOutputBundle(
        t,
        this.outputOptions.assetFileNames,
        this.facadeChunkByModule
      )
      try {
        await this.pluginDriver.hookParallel('renderStart', [
          this.outputOptions,
          this.inputOptions
        ]),
          _i('generate chunks', 2)
        const e = await this.generateChunks()
        e.length > 1 &&
          (function (e) {
            'umd' === e.format || 'iife' === e.format
              ? Jt({
                  code: 'INVALID_OPTION',
                  message:
                    'UMD and IIFE output formats are not supported for code-splitting builds.'
                })
              : 'string' == typeof e.file
                ? Jt({
                    code: 'INVALID_OPTION',
                    message:
                      'When building multiple chunks, the "output.dir" option must be used, not "output.file". To inline dynamic imports, set the "inlineDynamicImports" option.'
                  })
                : e.sourcemapFile &&
                  Jt({
                    code: 'INVALID_OPTION',
                    message: '"output.sourcemapFile" is only supported for single-file builds.'
                  })
          })(this.outputOptions)
        const s = (function (e) {
          if (0 === e.length) return '/'
          if (1 === e.length) return Re(e[0])
          const t = e.slice(1).reduce(
            (e, t) => {
              const s = t.split(/\/+|\\+/)
              let i
              for (i = 0; e[i] === s[i] && i < Math.min(e.length, s.length); i++);
              return e.slice(0, i)
            },
            e[0].split(/\/+|\\+/)
          )
          return t.length > 1 ? t.join('/') : '/'
        })(
          (function (e) {
            const t = []
            for (const s of e) for (const e of s.entryModules) Ne(e.id) && t.push(e.id)
            return t
          })(e)
        )
        Ai('generate chunks', 2), _i('render modules', 2)
        const i = await (async function (e, t) {
          try {
            let [s, i, n, r] = await Promise.all([
              t.hookReduceValue('banner', e.banner(), [], Mn),
              t.hookReduceValue('footer', e.footer(), [], Mn),
              t.hookReduceValue('intro', e.intro(), [], Rn),
              t.hookReduceValue('outro', e.outro(), [], Rn)
            ])
            return (
              n && (n += '\n\n'),
              r && (r = '\n\n' + r),
              s.length && (s += '\n'),
              i.length && (i = '\n' + i),
              { intro: n, outro: r, banner: s, footer: i }
            )
          } catch (e) {
            return Jt({
              code: 'ADDON_ERROR',
              message: `Could not retrieve ${e.hook}. Check configuration of plugin ${e.plugin}.\n\tError Message: ${e.message}`
            })
          }
        })(this.outputOptions, this.pluginDriver)
        this.prerenderChunks(e, s),
          Ai('render modules', 2),
          await this.addFinalizedChunksToBundle(e, s, i, t)
      } catch (e) {
        throw (await this.pluginDriver.hookParallel('renderError', [e]), e)
      }
      return (
        await this.pluginDriver.hookSeq('generateBundle', [this.outputOptions, t, e]),
        this.finaliseAssets(t),
        Ai('GENERATE', 1),
        t
      )
    }
    async addFinalizedChunksToBundle(e, t, s, i) {
      this.assignChunkIds(e, t, s, i)
      for (const t of e) i[t.id] = t.getChunkInfoWithFileNames()
      await Promise.all(
        e.map(async (e) => {
          const t = i[e.id]
          Object.assign(t, await e.render(this.outputOptions, s, t))
        })
      )
    }
    async addManualChunks(e) {
      const t = new Map(),
        s = await Promise.all(
          Object.keys(e).map(async (t) => ({
            alias: t,
            entries: await this.graph.moduleLoader.addAdditionalModules(e[t])
          }))
        )
      for (const { alias: e, entries: i } of s) for (const s of i) zn(e, s, t)
      return t
    }
    assignChunkIds(e, t, s, i) {
      const n = [],
        r = []
      for (const t of e) (t.facadeModule && t.facadeModule.isUserDefinedEntryPoint ? n : r).push(t)
      const a = n.concat(r)
      for (const e of a)
        this.outputOptions.file
          ? (e.id = Me(this.outputOptions.file))
          : this.outputOptions.preserveModules
            ? (e.id = e.generateIdPreserveModules(t, this.outputOptions, i, this.unsetOptions))
            : (e.id = e.generateId(s, this.outputOptions, i, !0)),
          (i[e.id] = Dn)
    }
    assignManualChunks(e) {
      const t = new Map(),
        s = {
          getModuleIds: () => this.graph.modulesById.keys(),
          getModuleInfo: this.graph.getModuleInfo
        }
      for (const i of this.graph.modulesById.values())
        if (i instanceof Ni) {
          const n = e(i.id, s)
          'string' == typeof n && zn(n, i, t)
        }
      return t
    }
    finaliseAssets(e) {
      for (const t of Object.keys(e)) {
        const s = e[t]
        s.type ||
          (hs(
            'A plugin is directly adding properties to the bundle object in the "generateBundle" hook. This is deprecated and will be removed in a future Rollup version, please use "this.emitFile" instead.',
            !0,
            this.inputOptions
          ),
          (s.type = 'asset'))
      }
      this.pluginDriver.finaliseAssets()
    }
    async generateChunks() {
      const { manualChunks: e } = this.outputOptions,
        t = 'object' == typeof e ? await this.addManualChunks(e) : this.assignManualChunks(e),
        s = [],
        i = new Map()
      for (const { alias: e, modules: n } of this.outputOptions.inlineDynamicImports
        ? [{ alias: null, modules: jn(this.graph.modulesById) }]
        : this.outputOptions.preserveModules
          ? jn(this.graph.modulesById).map((e) => ({ alias: null, modules: [e] }))
          : (function (e, t) {
              const s = [],
                i = new Set(t.keys()),
                n = Object.create(null)
              for (const [e, s] of t) $n(e, (n[s] = n[s] || []), i)
              for (const [e, t] of Object.entries(n)) s.push({ alias: e, modules: t })
              const r = new Map(),
                { dependentEntryPointsByModule: a, dynamicEntryModules: o } = (function (e) {
                  const t = new Set(),
                    s = new Map(),
                    i = new Set(e)
                  for (const e of i) {
                    const n = new Set([e])
                    for (const r of n) {
                      V(s, r, () => new Set()).add(e)
                      for (const e of r.getDependenciesToBeIncluded()) e instanceof De || n.add(e)
                      for (const { resolution: e } of r.dynamicImports)
                        e instanceof Ni &&
                          e.includedDynamicImporters.length > 0 &&
                          (t.add(e), i.add(e))
                      for (const e of r.implicitlyLoadedBefore) t.add(e), i.add(e)
                    }
                  }
                  return { dependentEntryPointsByModule: s, dynamicEntryModules: t }
                })(e),
                h = (function (e, t) {
                  const s = new Map()
                  for (const i of t) {
                    const t = V(s, i, () => new Set())
                    for (const s of [...i.includedDynamicImporters, ...i.implicitlyLoadedAfter])
                      for (const i of e.get(s)) t.add(i)
                  }
                  return s
                })(a, o),
                l = new Set(e)
              function c(e, t) {
                const s = new Set([e])
                for (const n of s) {
                  const o = V(r, n, () => new Set())
                  if (!t || !u(t, a.get(n))) {
                    o.add(e)
                    for (const e of n.getDependenciesToBeIncluded())
                      e instanceof De || i.has(e) || s.add(e)
                  }
                }
              }
              function u(e, t) {
                const s = new Set(e)
                for (const e of s)
                  if (!t.has(e)) {
                    if (l.has(e)) return !1
                    const t = h.get(e)
                    for (const e of t) s.add(e)
                  }
                return !0
              }
              for (const t of e) i.has(t) || c(t, null)
              for (const e of o) i.has(e) || c(e, h.get(e))
              return (
                s.push(
                  ...(function (e, t) {
                    const s = Object.create(null)
                    for (const [i, n] of t) {
                      let t = ''
                      for (const s of e) t += n.has(s) ? 'X' : '_'
                      const r = s[t]
                      r ? r.push(i) : (s[t] = [i])
                    }
                    return Object.keys(s).map((e) => ({ alias: null, modules: s[e] }))
                  })([...e, ...o], r)
                ),
                s
              )
            })(this.graph.entryModules, t)) {
        An(n)
        const t = new Ln(
          n,
          this.inputOptions,
          this.outputOptions,
          this.unsetOptions,
          this.pluginDriver,
          this.graph.modulesById,
          i,
          this.facadeChunkByModule,
          this.includedNamespaces,
          e
        )
        s.push(t)
        for (const e of n) i.set(e, t)
      }
      for (const e of s) e.link()
      const n = []
      for (const e of s) n.push(...e.generateFacades())
      return [...s, ...n]
    }
    prerenderChunks(e, t) {
      for (const t of e) t.generateExports()
      for (const s of e) s.preRender(this.outputOptions, t)
    }
  }
  function jn(e) {
    return [...e.values()].filter(
      (e) =>
        e instanceof Ni &&
        (e.isIncluded() || e.isEntryPoint || e.includedDynamicImporters.length > 0)
    )
  }
  function zn(e, t, s) {
    const i = s.get(t)
    if ('string' == typeof i && i !== e)
      return Jt(
        ((n = t.id),
        (r = e),
        (a = i),
        {
          code: es.INVALID_CHUNK,
          message: `Cannot assign ${Yt(n)} to the "${r}" chunk as it is already in the "${a}" chunk.`
        })
      )
    var n, r, a
    s.set(t, e)
  }
  var Gn = {
      3: 'abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile',
      5: 'class enum extends super const export import',
      6: 'enum',
      strict: 'implements interface let package private protected public static yield',
      strictBind: 'eval arguments'
    },
    Hn =
      'break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this',
    qn = {
      5: Hn,
      '5module': Hn + ' export import',
      6: Hn + ' const class extends export import super'
    },
    Kn = /^in(stanceof)?$/,
    Xn =
      'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ',
    Yn =
      '‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿᫀᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿',
    Qn = new RegExp('[' + Xn + ']'),
    Jn = new RegExp('[' + Xn + Yn + ']')
  Xn = Yn = null
  var Zn = [
      0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6,
      37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7,
      153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55,
      7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17,
      111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 107, 20, 28, 22, 13, 52,
      76, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24,
      85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13,
      4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0,
      72, 26, 230, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2,
      0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2,
      1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2749,
      1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6,
      0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395, 2309, 106,
      6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3,
      7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2,
      30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205,
      3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0,
      3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2,
      4, 2, 16, 4421, 42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938
    ],
    er = [
      509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370,
      1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13,
      2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11,
      1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82,
      12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6,
      4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4,
      0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9,
      1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418,
      49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10,
      9, 419, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239
    ]
  function tr(e, t) {
    for (var s = 65536, i = 0; i < t.length; i += 2) {
      if ((s += t[i]) > e) return !1
      if ((s += t[i + 1]) >= e) return !0
    }
  }
  function sr(e, t) {
    return e < 65
      ? 36 === e
      : e < 91 ||
          (e < 97
            ? 95 === e
            : e < 123 ||
              (e <= 65535 ? e >= 170 && Qn.test(String.fromCharCode(e)) : !1 !== t && tr(e, Zn)))
  }
  function ir(e, t) {
    return e < 48
      ? 36 === e
      : e < 58 ||
          (!(e < 65) &&
            (e < 91 ||
              (e < 97
                ? 95 === e
                : e < 123 ||
                  (e <= 65535
                    ? e >= 170 && Jn.test(String.fromCharCode(e))
                    : !1 !== t && (tr(e, Zn) || tr(e, er))))))
  }
  var nr = function (e, t) {
    void 0 === t && (t = {}),
      (this.label = e),
      (this.keyword = t.keyword),
      (this.beforeExpr = !!t.beforeExpr),
      (this.startsExpr = !!t.startsExpr),
      (this.isLoop = !!t.isLoop),
      (this.isAssign = !!t.isAssign),
      (this.prefix = !!t.prefix),
      (this.postfix = !!t.postfix),
      (this.binop = t.binop || null),
      (this.updateContext = null)
  }
  function rr(e, t) {
    return new nr(e, { beforeExpr: !0, binop: t })
  }
  var ar = { beforeExpr: !0 },
    or = { startsExpr: !0 },
    hr = {}
  function lr(e, t) {
    return void 0 === t && (t = {}), (t.keyword = e), (hr[e] = new nr(e, t))
  }
  var cr = {
      num: new nr('num', or),
      regexp: new nr('regexp', or),
      string: new nr('string', or),
      name: new nr('name', or),
      eof: new nr('eof'),
      bracketL: new nr('[', { beforeExpr: !0, startsExpr: !0 }),
      bracketR: new nr(']'),
      braceL: new nr('{', { beforeExpr: !0, startsExpr: !0 }),
      braceR: new nr('}'),
      parenL: new nr('(', { beforeExpr: !0, startsExpr: !0 }),
      parenR: new nr(')'),
      comma: new nr(',', ar),
      semi: new nr(';', ar),
      colon: new nr(':', ar),
      dot: new nr('.'),
      question: new nr('?', ar),
      questionDot: new nr('?.'),
      arrow: new nr('=>', ar),
      template: new nr('template'),
      invalidTemplate: new nr('invalidTemplate'),
      ellipsis: new nr('...', ar),
      backQuote: new nr('`', or),
      dollarBraceL: new nr('${', { beforeExpr: !0, startsExpr: !0 }),
      eq: new nr('=', { beforeExpr: !0, isAssign: !0 }),
      assign: new nr('_=', { beforeExpr: !0, isAssign: !0 }),
      incDec: new nr('++/--', { prefix: !0, postfix: !0, startsExpr: !0 }),
      prefix: new nr('!/~', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      logicalOR: rr('||', 1),
      logicalAND: rr('&&', 2),
      bitwiseOR: rr('|', 3),
      bitwiseXOR: rr('^', 4),
      bitwiseAND: rr('&', 5),
      equality: rr('==/!=/===/!==', 6),
      relational: rr('</>/<=/>=', 7),
      bitShift: rr('<</>>/>>>', 8),
      plusMin: new nr('+/-', { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
      modulo: rr('%', 10),
      star: rr('*', 10),
      slash: rr('/', 10),
      starstar: new nr('**', { beforeExpr: !0 }),
      coalesce: rr('??', 1),
      _break: lr('break'),
      _case: lr('case', ar),
      _catch: lr('catch'),
      _continue: lr('continue'),
      _debugger: lr('debugger'),
      _default: lr('default', ar),
      _do: lr('do', { isLoop: !0, beforeExpr: !0 }),
      _else: lr('else', ar),
      _finally: lr('finally'),
      _for: lr('for', { isLoop: !0 }),
      _function: lr('function', or),
      _if: lr('if'),
      _return: lr('return', ar),
      _switch: lr('switch'),
      _throw: lr('throw', ar),
      _try: lr('try'),
      _var: lr('var'),
      _const: lr('const'),
      _while: lr('while', { isLoop: !0 }),
      _with: lr('with'),
      _new: lr('new', { beforeExpr: !0, startsExpr: !0 }),
      _this: lr('this', or),
      _super: lr('super', or),
      _class: lr('class', or),
      _extends: lr('extends', ar),
      _export: lr('export'),
      _import: lr('import', or),
      _null: lr('null', or),
      _true: lr('true', or),
      _false: lr('false', or),
      _in: lr('in', { beforeExpr: !0, binop: 7 }),
      _instanceof: lr('instanceof', { beforeExpr: !0, binop: 7 }),
      _typeof: lr('typeof', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _void: lr('void', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _delete: lr('delete', { beforeExpr: !0, prefix: !0, startsExpr: !0 })
    },
    ur = /\r\n?|\n|\u2028|\u2029/,
    pr = new RegExp(ur.source, 'g')
  function dr(e, t) {
    return 10 === e || 13 === e || (!t && (8232 === e || 8233 === e))
  }
  var fr = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
    mr = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
    gr = Object.prototype,
    yr = gr.hasOwnProperty,
    xr = gr.toString
  function vr(e, t) {
    return yr.call(e, t)
  }
  var Er =
    Array.isArray ||
    function (e) {
      return '[object Array]' === xr.call(e)
    }
  function br(e) {
    return new RegExp('^(?:' + e.replace(/ /g, '|') + ')$')
  }
  var Sr = function (e, t) {
    ;(this.line = e), (this.column = t)
  }
  Sr.prototype.offset = function (e) {
    return new Sr(this.line, this.column + e)
  }
  var _r = function (e, t, s) {
    ;(this.start = t), (this.end = s), null !== e.sourceFile && (this.source = e.sourceFile)
  }
  function Ar(e, t) {
    for (var s = 1, i = 0; ; ) {
      pr.lastIndex = i
      var n = pr.exec(e)
      if (!(n && n.index < t)) return new Sr(s, t - i)
      ++s, (i = n.index + n[0].length)
    }
  }
  var kr = {
      ecmaVersion: null,
      sourceType: 'script',
      onInsertedSemicolon: null,
      onTrailingComma: null,
      allowReserved: null,
      allowReturnOutsideFunction: !1,
      allowImportExportEverywhere: !1,
      allowAwaitOutsideFunction: !1,
      allowHashBang: !1,
      locations: !1,
      onToken: null,
      onComment: null,
      ranges: !1,
      program: null,
      sourceFile: null,
      directSourceFile: null,
      preserveParens: !1
    },
    Cr = !1
  function wr(e, t) {
    return 2 | (e ? 4 : 0) | (t ? 8 : 0)
  }
  var Pr = function (e, t, s) {
      ;(this.options = e =
        (function (e) {
          var t = {}
          for (var s in kr) t[s] = e && vr(e, s) ? e[s] : kr[s]
          if (
            ('latest' === t.ecmaVersion
              ? (t.ecmaVersion = 1e8)
              : null == t.ecmaVersion
                ? (!Cr &&
                    'object' == typeof console &&
                    console.warn &&
                    ((Cr = !0),
                    console.warn(
                      'Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.'
                    )),
                  (t.ecmaVersion = 11))
                : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009),
            null == t.allowReserved && (t.allowReserved = t.ecmaVersion < 5),
            Er(t.onToken))
          ) {
            var i = t.onToken
            t.onToken = function (e) {
              return i.push(e)
            }
          }
          return (
            Er(t.onComment) &&
              (t.onComment = (function (e, t) {
                return function (s, i, n, r, a, o) {
                  var h = { type: s ? 'Block' : 'Line', value: i, start: n, end: r }
                  e.locations && (h.loc = new _r(this, a, o)),
                    e.ranges && (h.range = [n, r]),
                    t.push(h)
                }
              })(t, t.onComment)),
            t
          )
        })(e)),
        (this.sourceFile = e.sourceFile),
        (this.keywords = br(qn[e.ecmaVersion >= 6 ? 6 : 'module' === e.sourceType ? '5module' : 5]))
      var i = ''
      !0 !== e.allowReserved &&
        ((i = Gn[e.ecmaVersion >= 6 ? 6 : 5 === e.ecmaVersion ? 5 : 3]),
        'module' === e.sourceType && (i += ' await')),
        (this.reservedWords = br(i))
      var n = (i ? i + ' ' : '') + Gn.strict
      ;(this.reservedWordsStrict = br(n)),
        (this.reservedWordsStrictBind = br(n + ' ' + Gn.strictBind)),
        (this.input = String(t)),
        (this.containsEsc = !1),
        s
          ? ((this.pos = s),
            (this.lineStart = this.input.lastIndexOf('\n', s - 1) + 1),
            (this.curLine = this.input.slice(0, this.lineStart).split(ur).length))
          : ((this.pos = this.lineStart = 0), (this.curLine = 1)),
        (this.type = cr.eof),
        (this.value = null),
        (this.start = this.end = this.pos),
        (this.startLoc = this.endLoc = this.curPosition()),
        (this.lastTokEndLoc = this.lastTokStartLoc = null),
        (this.lastTokStart = this.lastTokEnd = this.pos),
        (this.context = this.initialContext()),
        (this.exprAllowed = !0),
        (this.inModule = 'module' === e.sourceType),
        (this.strict = this.inModule || this.strictDirective(this.pos)),
        (this.potentialArrowAt = -1),
        (this.yieldPos = this.awaitPos = this.awaitIdentPos = 0),
        (this.labels = []),
        (this.undefinedExports = {}),
        0 === this.pos &&
          e.allowHashBang &&
          '#!' === this.input.slice(0, 2) &&
          this.skipLineComment(2),
        (this.scopeStack = []),
        this.enterScope(1),
        (this.regexpState = null)
    },
    Ir = {
      inFunction: { configurable: !0 },
      inGenerator: { configurable: !0 },
      inAsync: { configurable: !0 },
      allowSuper: { configurable: !0 },
      allowDirectSuper: { configurable: !0 },
      treatFunctionsAsVar: { configurable: !0 },
      inNonArrowFunction: { configurable: !0 }
    }
  ;(Pr.prototype.parse = function () {
    var e = this.options.program || this.startNode()
    return this.nextToken(), this.parseTopLevel(e)
  }),
    (Ir.inFunction.get = function () {
      return (2 & this.currentVarScope().flags) > 0
    }),
    (Ir.inGenerator.get = function () {
      return (8 & this.currentVarScope().flags) > 0
    }),
    (Ir.inAsync.get = function () {
      return (4 & this.currentVarScope().flags) > 0
    }),
    (Ir.allowSuper.get = function () {
      return (64 & this.currentThisScope().flags) > 0
    }),
    (Ir.allowDirectSuper.get = function () {
      return (128 & this.currentThisScope().flags) > 0
    }),
    (Ir.treatFunctionsAsVar.get = function () {
      return this.treatFunctionsAsVarInScope(this.currentScope())
    }),
    (Ir.inNonArrowFunction.get = function () {
      return (2 & this.currentThisScope().flags) > 0
    }),
    (Pr.extend = function () {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t]
      for (var s = this, i = 0; i < e.length; i++) s = e[i](s)
      return s
    }),
    (Pr.parse = function (e, t) {
      return new this(t, e).parse()
    }),
    (Pr.parseExpressionAt = function (e, t, s) {
      var i = new this(s, e, t)
      return i.nextToken(), i.parseExpression()
    }),
    (Pr.tokenizer = function (e, t) {
      return new this(t, e)
    }),
    Object.defineProperties(Pr.prototype, Ir)
  var Nr = Pr.prototype,
    Tr = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/
  function Lr() {
    this.shorthandAssign =
      this.trailingComma =
      this.parenthesizedAssign =
      this.parenthesizedBind =
      this.doubleProto =
        -1
  }
  ;(Nr.strictDirective = function (e) {
    for (;;) {
      ;(mr.lastIndex = e), (e += mr.exec(this.input)[0].length)
      var t = Tr.exec(this.input.slice(e))
      if (!t) return !1
      if ('use strict' === (t[1] || t[2])) {
        mr.lastIndex = e + t[0].length
        var s = mr.exec(this.input),
          i = s.index + s[0].length,
          n = this.input.charAt(i)
        return (
          ';' === n ||
          '}' === n ||
          (ur.test(s[0]) &&
            !(/[(`.[+\-/*%<>=,?^&]/.test(n) || ('!' === n && '=' === this.input.charAt(i + 1))))
        )
      }
      ;(e += t[0].length),
        (mr.lastIndex = e),
        (e += mr.exec(this.input)[0].length),
        ';' === this.input[e] && e++
    }
  }),
    (Nr.eat = function (e) {
      return this.type === e && (this.next(), !0)
    }),
    (Nr.isContextual = function (e) {
      return this.type === cr.name && this.value === e && !this.containsEsc
    }),
    (Nr.eatContextual = function (e) {
      return !!this.isContextual(e) && (this.next(), !0)
    }),
    (Nr.expectContextual = function (e) {
      this.eatContextual(e) || this.unexpected()
    }),
    (Nr.canInsertSemicolon = function () {
      return (
        this.type === cr.eof ||
        this.type === cr.braceR ||
        ur.test(this.input.slice(this.lastTokEnd, this.start))
      )
    }),
    (Nr.insertSemicolon = function () {
      if (this.canInsertSemicolon())
        return (
          this.options.onInsertedSemicolon &&
            this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc),
          !0
        )
    }),
    (Nr.semicolon = function () {
      this.eat(cr.semi) || this.insertSemicolon() || this.unexpected()
    }),
    (Nr.afterTrailingComma = function (e, t) {
      if (this.type === e)
        return (
          this.options.onTrailingComma &&
            this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc),
          t || this.next(),
          !0
        )
    }),
    (Nr.expect = function (e) {
      this.eat(e) || this.unexpected()
    }),
    (Nr.unexpected = function (e) {
      this.raise(null != e ? e : this.start, 'Unexpected token')
    }),
    (Nr.checkPatternErrors = function (e, t) {
      if (e) {
        e.trailingComma > -1 &&
          this.raiseRecoverable(e.trailingComma, 'Comma is not permitted after the rest element')
        var s = t ? e.parenthesizedAssign : e.parenthesizedBind
        s > -1 && this.raiseRecoverable(s, 'Parenthesized pattern')
      }
    }),
    (Nr.checkExpressionErrors = function (e, t) {
      if (!e) return !1
      var s = e.shorthandAssign,
        i = e.doubleProto
      if (!t) return s >= 0 || i >= 0
      s >= 0 &&
        this.raise(s, 'Shorthand property assignments are valid only in destructuring patterns'),
        i >= 0 && this.raiseRecoverable(i, 'Redefinition of __proto__ property')
    }),
    (Nr.checkYieldAwaitInDefaultParams = function () {
      this.yieldPos &&
        (!this.awaitPos || this.yieldPos < this.awaitPos) &&
        this.raise(this.yieldPos, 'Yield expression cannot be a default value'),
        this.awaitPos && this.raise(this.awaitPos, 'Await expression cannot be a default value')
    }),
    (Nr.isSimpleAssignTarget = function (e) {
      return 'ParenthesizedExpression' === e.type
        ? this.isSimpleAssignTarget(e.expression)
        : 'Identifier' === e.type || 'MemberExpression' === e.type
    })
  var Mr = Pr.prototype
  Mr.parseTopLevel = function (e) {
    var t = {}
    for (e.body || (e.body = []); this.type !== cr.eof; ) {
      var s = this.parseStatement(null, !0, t)
      e.body.push(s)
    }
    if (this.inModule)
      for (var i = 0, n = Object.keys(this.undefinedExports); i < n.length; i += 1) {
        var r = n[i]
        this.raiseRecoverable(this.undefinedExports[r].start, "Export '" + r + "' is not defined")
      }
    return (
      this.adaptDirectivePrologue(e.body),
      this.next(),
      (e.sourceType = this.options.sourceType),
      this.finishNode(e, 'Program')
    )
  }
  var Rr = { kind: 'loop' },
    $r = { kind: 'switch' }
  ;(Mr.isLet = function (e) {
    if (this.options.ecmaVersion < 6 || !this.isContextual('let')) return !1
    mr.lastIndex = this.pos
    var t = mr.exec(this.input),
      s = this.pos + t[0].length,
      i = this.input.charCodeAt(s)
    if (91 === i) return !0
    if (e) return !1
    if (123 === i) return !0
    if (sr(i, !0)) {
      for (var n = s + 1; ir(this.input.charCodeAt(n), !0); ) ++n
      var r = this.input.slice(s, n)
      if (!Kn.test(r)) return !0
    }
    return !1
  }),
    (Mr.isAsyncFunction = function () {
      if (this.options.ecmaVersion < 8 || !this.isContextual('async')) return !1
      mr.lastIndex = this.pos
      var e = mr.exec(this.input),
        t = this.pos + e[0].length
      return !(
        ur.test(this.input.slice(this.pos, t)) ||
        'function' !== this.input.slice(t, t + 8) ||
        (t + 8 !== this.input.length && ir(this.input.charAt(t + 8)))
      )
    }),
    (Mr.parseStatement = function (e, t, s) {
      var i,
        n = this.type,
        r = this.startNode()
      switch ((this.isLet(e) && ((n = cr._var), (i = 'let')), n)) {
        case cr._break:
        case cr._continue:
          return this.parseBreakContinueStatement(r, n.keyword)
        case cr._debugger:
          return this.parseDebuggerStatement(r)
        case cr._do:
          return this.parseDoStatement(r)
        case cr._for:
          return this.parseForStatement(r)
        case cr._function:
          return (
            e &&
              (this.strict || ('if' !== e && 'label' !== e)) &&
              this.options.ecmaVersion >= 6 &&
              this.unexpected(),
            this.parseFunctionStatement(r, !1, !e)
          )
        case cr._class:
          return e && this.unexpected(), this.parseClass(r, !0)
        case cr._if:
          return this.parseIfStatement(r)
        case cr._return:
          return this.parseReturnStatement(r)
        case cr._switch:
          return this.parseSwitchStatement(r)
        case cr._throw:
          return this.parseThrowStatement(r)
        case cr._try:
          return this.parseTryStatement(r)
        case cr._const:
        case cr._var:
          return (
            (i = i || this.value),
            e && 'var' !== i && this.unexpected(),
            this.parseVarStatement(r, i)
          )
        case cr._while:
          return this.parseWhileStatement(r)
        case cr._with:
          return this.parseWithStatement(r)
        case cr.braceL:
          return this.parseBlock(!0, r)
        case cr.semi:
          return this.parseEmptyStatement(r)
        case cr._export:
        case cr._import:
          if (this.options.ecmaVersion > 10 && n === cr._import) {
            mr.lastIndex = this.pos
            var a = mr.exec(this.input),
              o = this.pos + a[0].length,
              h = this.input.charCodeAt(o)
            if (40 === h || 46 === h)
              return this.parseExpressionStatement(r, this.parseExpression())
          }
          return (
            this.options.allowImportExportEverywhere ||
              (t ||
                this.raise(this.start, "'import' and 'export' may only appear at the top level"),
              this.inModule ||
                this.raise(
                  this.start,
                  "'import' and 'export' may appear only with 'sourceType: module'"
                )),
            n === cr._import ? this.parseImport(r) : this.parseExport(r, s)
          )
        default:
          if (this.isAsyncFunction())
            return e && this.unexpected(), this.next(), this.parseFunctionStatement(r, !0, !e)
          var l = this.value,
            c = this.parseExpression()
          return n === cr.name && 'Identifier' === c.type && this.eat(cr.colon)
            ? this.parseLabeledStatement(r, l, c, e)
            : this.parseExpressionStatement(r, c)
      }
    }),
    (Mr.parseBreakContinueStatement = function (e, t) {
      var s = 'break' === t
      this.next(),
        this.eat(cr.semi) || this.insertSemicolon()
          ? (e.label = null)
          : this.type !== cr.name
            ? this.unexpected()
            : ((e.label = this.parseIdent()), this.semicolon())
      for (var i = 0; i < this.labels.length; ++i) {
        var n = this.labels[i]
        if (null == e.label || n.name === e.label.name) {
          if (null != n.kind && (s || 'loop' === n.kind)) break
          if (e.label && s) break
        }
      }
      return (
        i === this.labels.length && this.raise(e.start, 'Unsyntactic ' + t),
        this.finishNode(e, s ? 'BreakStatement' : 'ContinueStatement')
      )
    }),
    (Mr.parseDebuggerStatement = function (e) {
      return this.next(), this.semicolon(), this.finishNode(e, 'DebuggerStatement')
    }),
    (Mr.parseDoStatement = function (e) {
      return (
        this.next(),
        this.labels.push(Rr),
        (e.body = this.parseStatement('do')),
        this.labels.pop(),
        this.expect(cr._while),
        (e.test = this.parseParenExpression()),
        this.options.ecmaVersion >= 6 ? this.eat(cr.semi) : this.semicolon(),
        this.finishNode(e, 'DoWhileStatement')
      )
    }),
    (Mr.parseForStatement = function (e) {
      this.next()
      var t =
        this.options.ecmaVersion >= 9 &&
        (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction)) &&
        this.eatContextual('await')
          ? this.lastTokStart
          : -1
      if ((this.labels.push(Rr), this.enterScope(0), this.expect(cr.parenL), this.type === cr.semi))
        return t > -1 && this.unexpected(t), this.parseFor(e, null)
      var s = this.isLet()
      if (this.type === cr._var || this.type === cr._const || s) {
        var i = this.startNode(),
          n = s ? 'let' : this.value
        return (
          this.next(),
          this.parseVar(i, !0, n),
          this.finishNode(i, 'VariableDeclaration'),
          (this.type === cr._in || (this.options.ecmaVersion >= 6 && this.isContextual('of'))) &&
          1 === i.declarations.length
            ? (this.options.ecmaVersion >= 9 &&
                (this.type === cr._in ? t > -1 && this.unexpected(t) : (e.await = t > -1)),
              this.parseForIn(e, i))
            : (t > -1 && this.unexpected(t), this.parseFor(e, i))
        )
      }
      var r = new Lr(),
        a = this.parseExpression(!0, r)
      return this.type === cr._in || (this.options.ecmaVersion >= 6 && this.isContextual('of'))
        ? (this.options.ecmaVersion >= 9 &&
            (this.type === cr._in ? t > -1 && this.unexpected(t) : (e.await = t > -1)),
          this.toAssignable(a, !1, r),
          this.checkLValPattern(a),
          this.parseForIn(e, a))
        : (this.checkExpressionErrors(r, !0), t > -1 && this.unexpected(t), this.parseFor(e, a))
    }),
    (Mr.parseFunctionStatement = function (e, t, s) {
      return this.next(), this.parseFunction(e, Vr | (s ? 0 : Dr), !1, t)
    }),
    (Mr.parseIfStatement = function (e) {
      return (
        this.next(),
        (e.test = this.parseParenExpression()),
        (e.consequent = this.parseStatement('if')),
        (e.alternate = this.eat(cr._else) ? this.parseStatement('if') : null),
        this.finishNode(e, 'IfStatement')
      )
    }),
    (Mr.parseReturnStatement = function (e) {
      return (
        this.inFunction ||
          this.options.allowReturnOutsideFunction ||
          this.raise(this.start, "'return' outside of function"),
        this.next(),
        this.eat(cr.semi) || this.insertSemicolon()
          ? (e.argument = null)
          : ((e.argument = this.parseExpression()), this.semicolon()),
        this.finishNode(e, 'ReturnStatement')
      )
    }),
    (Mr.parseSwitchStatement = function (e) {
      var t
      this.next(),
        (e.discriminant = this.parseParenExpression()),
        (e.cases = []),
        this.expect(cr.braceL),
        this.labels.push($r),
        this.enterScope(0)
      for (var s = !1; this.type !== cr.braceR; )
        if (this.type === cr._case || this.type === cr._default) {
          var i = this.type === cr._case
          t && this.finishNode(t, 'SwitchCase'),
            e.cases.push((t = this.startNode())),
            (t.consequent = []),
            this.next(),
            i
              ? (t.test = this.parseExpression())
              : (s && this.raiseRecoverable(this.lastTokStart, 'Multiple default clauses'),
                (s = !0),
                (t.test = null)),
            this.expect(cr.colon)
        } else t || this.unexpected(), t.consequent.push(this.parseStatement(null))
      return (
        this.exitScope(),
        t && this.finishNode(t, 'SwitchCase'),
        this.next(),
        this.labels.pop(),
        this.finishNode(e, 'SwitchStatement')
      )
    }),
    (Mr.parseThrowStatement = function (e) {
      return (
        this.next(),
        ur.test(this.input.slice(this.lastTokEnd, this.start)) &&
          this.raise(this.lastTokEnd, 'Illegal newline after throw'),
        (e.argument = this.parseExpression()),
        this.semicolon(),
        this.finishNode(e, 'ThrowStatement')
      )
    })
  var Or = []
  ;(Mr.parseTryStatement = function (e) {
    if ((this.next(), (e.block = this.parseBlock()), (e.handler = null), this.type === cr._catch)) {
      var t = this.startNode()
      if ((this.next(), this.eat(cr.parenL))) {
        t.param = this.parseBindingAtom()
        var s = 'Identifier' === t.param.type
        this.enterScope(s ? 32 : 0),
          this.checkLValPattern(t.param, s ? 4 : 2),
          this.expect(cr.parenR)
      } else
        this.options.ecmaVersion < 10 && this.unexpected(), (t.param = null), this.enterScope(0)
      ;(t.body = this.parseBlock(!1)),
        this.exitScope(),
        (e.handler = this.finishNode(t, 'CatchClause'))
    }
    return (
      (e.finalizer = this.eat(cr._finally) ? this.parseBlock() : null),
      e.handler || e.finalizer || this.raise(e.start, 'Missing catch or finally clause'),
      this.finishNode(e, 'TryStatement')
    )
  }),
    (Mr.parseVarStatement = function (e, t) {
      return (
        this.next(),
        this.parseVar(e, !1, t),
        this.semicolon(),
        this.finishNode(e, 'VariableDeclaration')
      )
    }),
    (Mr.parseWhileStatement = function (e) {
      return (
        this.next(),
        (e.test = this.parseParenExpression()),
        this.labels.push(Rr),
        (e.body = this.parseStatement('while')),
        this.labels.pop(),
        this.finishNode(e, 'WhileStatement')
      )
    }),
    (Mr.parseWithStatement = function (e) {
      return (
        this.strict && this.raise(this.start, "'with' in strict mode"),
        this.next(),
        (e.object = this.parseParenExpression()),
        (e.body = this.parseStatement('with')),
        this.finishNode(e, 'WithStatement')
      )
    }),
    (Mr.parseEmptyStatement = function (e) {
      return this.next(), this.finishNode(e, 'EmptyStatement')
    }),
    (Mr.parseLabeledStatement = function (e, t, s, i) {
      for (var n = 0, r = this.labels; n < r.length; n += 1)
        r[n].name === t && this.raise(s.start, "Label '" + t + "' is already declared")
      for (
        var a = this.type.isLoop ? 'loop' : this.type === cr._switch ? 'switch' : null,
          o = this.labels.length - 1;
        o >= 0;
        o--
      ) {
        var h = this.labels[o]
        if (h.statementStart !== e.start) break
        ;(h.statementStart = this.start), (h.kind = a)
      }
      return (
        this.labels.push({ name: t, kind: a, statementStart: this.start }),
        (e.body = this.parseStatement(i ? (-1 === i.indexOf('label') ? i + 'label' : i) : 'label')),
        this.labels.pop(),
        (e.label = s),
        this.finishNode(e, 'LabeledStatement')
      )
    }),
    (Mr.parseExpressionStatement = function (e, t) {
      return (e.expression = t), this.semicolon(), this.finishNode(e, 'ExpressionStatement')
    }),
    (Mr.parseBlock = function (e, t, s) {
      for (
        void 0 === e && (e = !0),
          void 0 === t && (t = this.startNode()),
          t.body = [],
          this.expect(cr.braceL),
          e && this.enterScope(0);
        this.type !== cr.braceR;

      ) {
        var i = this.parseStatement(null)
        t.body.push(i)
      }
      return (
        s && (this.strict = !1),
        this.next(),
        e && this.exitScope(),
        this.finishNode(t, 'BlockStatement')
      )
    }),
    (Mr.parseFor = function (e, t) {
      return (
        (e.init = t),
        this.expect(cr.semi),
        (e.test = this.type === cr.semi ? null : this.parseExpression()),
        this.expect(cr.semi),
        (e.update = this.type === cr.parenR ? null : this.parseExpression()),
        this.expect(cr.parenR),
        (e.body = this.parseStatement('for')),
        this.exitScope(),
        this.labels.pop(),
        this.finishNode(e, 'ForStatement')
      )
    }),
    (Mr.parseForIn = function (e, t) {
      var s = this.type === cr._in
      return (
        this.next(),
        'VariableDeclaration' === t.type &&
          null != t.declarations[0].init &&
          (!s ||
            this.options.ecmaVersion < 8 ||
            this.strict ||
            'var' !== t.kind ||
            'Identifier' !== t.declarations[0].id.type) &&
          this.raise(
            t.start,
            (s ? 'for-in' : 'for-of') + ' loop variable declaration may not have an initializer'
          ),
        (e.left = t),
        (e.right = s ? this.parseExpression() : this.parseMaybeAssign()),
        this.expect(cr.parenR),
        (e.body = this.parseStatement('for')),
        this.exitScope(),
        this.labels.pop(),
        this.finishNode(e, s ? 'ForInStatement' : 'ForOfStatement')
      )
    }),
    (Mr.parseVar = function (e, t, s) {
      for (e.declarations = [], e.kind = s; ; ) {
        var i = this.startNode()
        if (
          (this.parseVarId(i, s),
          this.eat(cr.eq)
            ? (i.init = this.parseMaybeAssign(t))
            : 'const' !== s ||
                this.type === cr._in ||
                (this.options.ecmaVersion >= 6 && this.isContextual('of'))
              ? 'Identifier' === i.id.type ||
                (t && (this.type === cr._in || this.isContextual('of')))
                ? (i.init = null)
                : this.raise(
                    this.lastTokEnd,
                    'Complex binding patterns require an initialization value'
                  )
              : this.unexpected(),
          e.declarations.push(this.finishNode(i, 'VariableDeclarator')),
          !this.eat(cr.comma))
        )
          break
      }
      return e
    }),
    (Mr.parseVarId = function (e, t) {
      ;(e.id = this.parseBindingAtom()), this.checkLValPattern(e.id, 'var' === t ? 1 : 2, !1)
    })
  var Vr = 1,
    Dr = 2
  ;(Mr.parseFunction = function (e, t, s, i) {
    this.initFunction(e),
      (this.options.ecmaVersion >= 9 || (this.options.ecmaVersion >= 6 && !i)) &&
        (this.type === cr.star && t & Dr && this.unexpected(), (e.generator = this.eat(cr.star))),
      this.options.ecmaVersion >= 8 && (e.async = !!i),
      t & Vr &&
        ((e.id = 4 & t && this.type !== cr.name ? null : this.parseIdent()),
        !e.id ||
          t & Dr ||
          this.checkLValSimple(
            e.id,
            this.strict || e.generator || e.async ? (this.treatFunctionsAsVar ? 1 : 2) : 3
          ))
    var n = this.yieldPos,
      r = this.awaitPos,
      a = this.awaitIdentPos
    return (
      (this.yieldPos = 0),
      (this.awaitPos = 0),
      (this.awaitIdentPos = 0),
      this.enterScope(wr(e.async, e.generator)),
      t & Vr || (e.id = this.type === cr.name ? this.parseIdent() : null),
      this.parseFunctionParams(e),
      this.parseFunctionBody(e, s, !1),
      (this.yieldPos = n),
      (this.awaitPos = r),
      (this.awaitIdentPos = a),
      this.finishNode(e, t & Vr ? 'FunctionDeclaration' : 'FunctionExpression')
    )
  }),
    (Mr.parseFunctionParams = function (e) {
      this.expect(cr.parenL),
        (e.params = this.parseBindingList(cr.parenR, !1, this.options.ecmaVersion >= 8)),
        this.checkYieldAwaitInDefaultParams()
    }),
    (Mr.parseClass = function (e, t) {
      this.next()
      var s = this.strict
      ;(this.strict = !0), this.parseClassId(e, t), this.parseClassSuper(e)
      var i = this.startNode(),
        n = !1
      for (i.body = [], this.expect(cr.braceL); this.type !== cr.braceR; ) {
        var r = this.parseClassElement(null !== e.superClass)
        r &&
          (i.body.push(r),
          'MethodDefinition' === r.type &&
            'constructor' === r.kind &&
            (n && this.raise(r.start, 'Duplicate constructor in the same class'), (n = !0)))
      }
      return (
        (this.strict = s),
        this.next(),
        (e.body = this.finishNode(i, 'ClassBody')),
        this.finishNode(e, t ? 'ClassDeclaration' : 'ClassExpression')
      )
    }),
    (Mr.parseClassElement = function (e) {
      var t = this
      if (this.eat(cr.semi)) return null
      var s = this.startNode(),
        i = function (e, i) {
          void 0 === i && (i = !1)
          var n = t.start,
            r = t.startLoc
          return !(
            !t.eatContextual(e) ||
            ((t.type === cr.parenL || (i && t.canInsertSemicolon())) &&
              (s.key && t.unexpected(),
              (s.computed = !1),
              (s.key = t.startNodeAt(n, r)),
              (s.key.name = e),
              t.finishNode(s.key, 'Identifier'),
              1))
          )
        }
      ;(s.kind = 'method'), (s.static = i('static'))
      var n = this.eat(cr.star),
        r = !1
      n ||
        (this.options.ecmaVersion >= 8 && i('async', !0)
          ? ((r = !0), (n = this.options.ecmaVersion >= 9 && this.eat(cr.star)))
          : i('get')
            ? (s.kind = 'get')
            : i('set') && (s.kind = 'set')),
        s.key || this.parsePropertyName(s)
      var a = s.key,
        o = !1
      return (
        s.computed ||
        s.static ||
        !(
          ('Identifier' === a.type && 'constructor' === a.name) ||
          ('Literal' === a.type && 'constructor' === a.value)
        )
          ? s.static &&
            'Identifier' === a.type &&
            'prototype' === a.name &&
            this.raise(a.start, 'Classes may not have a static property named prototype')
          : ('method' !== s.kind && this.raise(a.start, "Constructor can't have get/set modifier"),
            n && this.raise(a.start, "Constructor can't be a generator"),
            r && this.raise(a.start, "Constructor can't be an async method"),
            (s.kind = 'constructor'),
            (o = e)),
        this.parseClassMethod(s, n, r, o),
        'get' === s.kind &&
          0 !== s.value.params.length &&
          this.raiseRecoverable(s.value.start, 'getter should have no params'),
        'set' === s.kind &&
          1 !== s.value.params.length &&
          this.raiseRecoverable(s.value.start, 'setter should have exactly one param'),
        'set' === s.kind &&
          'RestElement' === s.value.params[0].type &&
          this.raiseRecoverable(s.value.params[0].start, 'Setter cannot use rest params'),
        s
      )
    }),
    (Mr.parseClassMethod = function (e, t, s, i) {
      return (e.value = this.parseMethod(t, s, i)), this.finishNode(e, 'MethodDefinition')
    }),
    (Mr.parseClassId = function (e, t) {
      this.type === cr.name
        ? ((e.id = this.parseIdent()), t && this.checkLValSimple(e.id, 2, !1))
        : (!0 === t && this.unexpected(), (e.id = null))
    }),
    (Mr.parseClassSuper = function (e) {
      e.superClass = this.eat(cr._extends) ? this.parseExprSubscripts() : null
    }),
    (Mr.parseExport = function (e, t) {
      if ((this.next(), this.eat(cr.star)))
        return (
          this.options.ecmaVersion >= 11 &&
            (this.eatContextual('as')
              ? ((e.exported = this.parseIdent(!0)),
                this.checkExport(t, e.exported.name, this.lastTokStart))
              : (e.exported = null)),
          this.expectContextual('from'),
          this.type !== cr.string && this.unexpected(),
          (e.source = this.parseExprAtom()),
          this.semicolon(),
          this.finishNode(e, 'ExportAllDeclaration')
        )
      if (this.eat(cr._default)) {
        var s
        if (
          (this.checkExport(t, 'default', this.lastTokStart),
          this.type === cr._function || (s = this.isAsyncFunction()))
        ) {
          var i = this.startNode()
          this.next(), s && this.next(), (e.declaration = this.parseFunction(i, 4 | Vr, !1, s))
        } else if (this.type === cr._class) {
          var n = this.startNode()
          e.declaration = this.parseClass(n, 'nullableID')
        } else (e.declaration = this.parseMaybeAssign()), this.semicolon()
        return this.finishNode(e, 'ExportDefaultDeclaration')
      }
      if (this.shouldParseExportStatement())
        (e.declaration = this.parseStatement(null)),
          'VariableDeclaration' === e.declaration.type
            ? this.checkVariableExport(t, e.declaration.declarations)
            : this.checkExport(t, e.declaration.id.name, e.declaration.id.start),
          (e.specifiers = []),
          (e.source = null)
      else {
        if (
          ((e.declaration = null),
          (e.specifiers = this.parseExportSpecifiers(t)),
          this.eatContextual('from'))
        )
          this.type !== cr.string && this.unexpected(), (e.source = this.parseExprAtom())
        else {
          for (var r = 0, a = e.specifiers; r < a.length; r += 1) {
            var o = a[r]
            this.checkUnreserved(o.local), this.checkLocalExport(o.local)
          }
          e.source = null
        }
        this.semicolon()
      }
      return this.finishNode(e, 'ExportNamedDeclaration')
    }),
    (Mr.checkExport = function (e, t, s) {
      e && (vr(e, t) && this.raiseRecoverable(s, "Duplicate export '" + t + "'"), (e[t] = !0))
    }),
    (Mr.checkPatternExport = function (e, t) {
      var s = t.type
      if ('Identifier' === s) this.checkExport(e, t.name, t.start)
      else if ('ObjectPattern' === s)
        for (var i = 0, n = t.properties; i < n.length; i += 1) {
          var r = n[i]
          this.checkPatternExport(e, r)
        }
      else if ('ArrayPattern' === s)
        for (var a = 0, o = t.elements; a < o.length; a += 1) {
          var h = o[a]
          h && this.checkPatternExport(e, h)
        }
      else
        'Property' === s
          ? this.checkPatternExport(e, t.value)
          : 'AssignmentPattern' === s
            ? this.checkPatternExport(e, t.left)
            : 'RestElement' === s
              ? this.checkPatternExport(e, t.argument)
              : 'ParenthesizedExpression' === s && this.checkPatternExport(e, t.expression)
    }),
    (Mr.checkVariableExport = function (e, t) {
      if (e)
        for (var s = 0, i = t; s < i.length; s += 1) {
          var n = i[s]
          this.checkPatternExport(e, n.id)
        }
    }),
    (Mr.shouldParseExportStatement = function () {
      return (
        'var' === this.type.keyword ||
        'const' === this.type.keyword ||
        'class' === this.type.keyword ||
        'function' === this.type.keyword ||
        this.isLet() ||
        this.isAsyncFunction()
      )
    }),
    (Mr.parseExportSpecifiers = function (e) {
      var t = [],
        s = !0
      for (this.expect(cr.braceL); !this.eat(cr.braceR); ) {
        if (s) s = !1
        else if ((this.expect(cr.comma), this.afterTrailingComma(cr.braceR))) break
        var i = this.startNode()
        ;(i.local = this.parseIdent(!0)),
          (i.exported = this.eatContextual('as') ? this.parseIdent(!0) : i.local),
          this.checkExport(e, i.exported.name, i.exported.start),
          t.push(this.finishNode(i, 'ExportSpecifier'))
      }
      return t
    }),
    (Mr.parseImport = function (e) {
      return (
        this.next(),
        this.type === cr.string
          ? ((e.specifiers = Or), (e.source = this.parseExprAtom()))
          : ((e.specifiers = this.parseImportSpecifiers()),
            this.expectContextual('from'),
            (e.source = this.type === cr.string ? this.parseExprAtom() : this.unexpected())),
        this.semicolon(),
        this.finishNode(e, 'ImportDeclaration')
      )
    }),
    (Mr.parseImportSpecifiers = function () {
      var e = [],
        t = !0
      if (this.type === cr.name) {
        var s = this.startNode()
        if (
          ((s.local = this.parseIdent()),
          this.checkLValSimple(s.local, 2),
          e.push(this.finishNode(s, 'ImportDefaultSpecifier')),
          !this.eat(cr.comma))
        )
          return e
      }
      if (this.type === cr.star) {
        var i = this.startNode()
        return (
          this.next(),
          this.expectContextual('as'),
          (i.local = this.parseIdent()),
          this.checkLValSimple(i.local, 2),
          e.push(this.finishNode(i, 'ImportNamespaceSpecifier')),
          e
        )
      }
      for (this.expect(cr.braceL); !this.eat(cr.braceR); ) {
        if (t) t = !1
        else if ((this.expect(cr.comma), this.afterTrailingComma(cr.braceR))) break
        var n = this.startNode()
        ;(n.imported = this.parseIdent(!0)),
          this.eatContextual('as')
            ? (n.local = this.parseIdent())
            : (this.checkUnreserved(n.imported), (n.local = n.imported)),
          this.checkLValSimple(n.local, 2),
          e.push(this.finishNode(n, 'ImportSpecifier'))
      }
      return e
    }),
    (Mr.adaptDirectivePrologue = function (e) {
      for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
        e[t].directive = e[t].expression.raw.slice(1, -1)
    }),
    (Mr.isDirectiveCandidate = function (e) {
      return (
        'ExpressionStatement' === e.type &&
        'Literal' === e.expression.type &&
        'string' == typeof e.expression.value &&
        ('"' === this.input[e.start] || "'" === this.input[e.start])
      )
    })
  var Br = Pr.prototype
  ;(Br.toAssignable = function (e, t, s) {
    if (this.options.ecmaVersion >= 6 && e)
      switch (e.type) {
        case 'Identifier':
          this.inAsync &&
            'await' === e.name &&
            this.raise(e.start, "Cannot use 'await' as identifier inside an async function")
          break
        case 'ObjectPattern':
        case 'ArrayPattern':
        case 'AssignmentPattern':
        case 'RestElement':
          break
        case 'ObjectExpression':
          ;(e.type = 'ObjectPattern'), s && this.checkPatternErrors(s, !0)
          for (var i = 0, n = e.properties; i < n.length; i += 1) {
            var r = n[i]
            this.toAssignable(r, t),
              'RestElement' !== r.type ||
                ('ArrayPattern' !== r.argument.type && 'ObjectPattern' !== r.argument.type) ||
                this.raise(r.argument.start, 'Unexpected token')
          }
          break
        case 'Property':
          'init' !== e.kind &&
            this.raise(e.key.start, "Object pattern can't contain getter or setter"),
            this.toAssignable(e.value, t)
          break
        case 'ArrayExpression':
          ;(e.type = 'ArrayPattern'),
            s && this.checkPatternErrors(s, !0),
            this.toAssignableList(e.elements, t)
          break
        case 'SpreadElement':
          ;(e.type = 'RestElement'),
            this.toAssignable(e.argument, t),
            'AssignmentPattern' === e.argument.type &&
              this.raise(e.argument.start, 'Rest elements cannot have a default value')
          break
        case 'AssignmentExpression':
          '=' !== e.operator &&
            this.raise(e.left.end, "Only '=' operator can be used for specifying default value."),
            (e.type = 'AssignmentPattern'),
            delete e.operator,
            this.toAssignable(e.left, t)
          break
        case 'ParenthesizedExpression':
          this.toAssignable(e.expression, t, s)
          break
        case 'ChainExpression':
          this.raiseRecoverable(e.start, 'Optional chaining cannot appear in left-hand side')
          break
        case 'MemberExpression':
          if (!t) break
        default:
          this.raise(e.start, 'Assigning to rvalue')
      }
    else s && this.checkPatternErrors(s, !0)
    return e
  }),
    (Br.toAssignableList = function (e, t) {
      for (var s = e.length, i = 0; i < s; i++) {
        var n = e[i]
        n && this.toAssignable(n, t)
      }
      if (s) {
        var r = e[s - 1]
        6 === this.options.ecmaVersion &&
          t &&
          r &&
          'RestElement' === r.type &&
          'Identifier' !== r.argument.type &&
          this.unexpected(r.argument.start)
      }
      return e
    }),
    (Br.parseSpread = function (e) {
      var t = this.startNode()
      return (
        this.next(),
        (t.argument = this.parseMaybeAssign(!1, e)),
        this.finishNode(t, 'SpreadElement')
      )
    }),
    (Br.parseRestBinding = function () {
      var e = this.startNode()
      return (
        this.next(),
        6 === this.options.ecmaVersion && this.type !== cr.name && this.unexpected(),
        (e.argument = this.parseBindingAtom()),
        this.finishNode(e, 'RestElement')
      )
    }),
    (Br.parseBindingAtom = function () {
      if (this.options.ecmaVersion >= 6)
        switch (this.type) {
          case cr.bracketL:
            var e = this.startNode()
            return (
              this.next(),
              (e.elements = this.parseBindingList(cr.bracketR, !0, !0)),
              this.finishNode(e, 'ArrayPattern')
            )
          case cr.braceL:
            return this.parseObj(!0)
        }
      return this.parseIdent()
    }),
    (Br.parseBindingList = function (e, t, s) {
      for (var i = [], n = !0; !this.eat(e); )
        if ((n ? (n = !1) : this.expect(cr.comma), t && this.type === cr.comma)) i.push(null)
        else {
          if (s && this.afterTrailingComma(e)) break
          if (this.type === cr.ellipsis) {
            var r = this.parseRestBinding()
            this.parseBindingListItem(r),
              i.push(r),
              this.type === cr.comma &&
                this.raise(this.start, 'Comma is not permitted after the rest element'),
              this.expect(e)
            break
          }
          var a = this.parseMaybeDefault(this.start, this.startLoc)
          this.parseBindingListItem(a), i.push(a)
        }
      return i
    }),
    (Br.parseBindingListItem = function (e) {
      return e
    }),
    (Br.parseMaybeDefault = function (e, t, s) {
      if (((s = s || this.parseBindingAtom()), this.options.ecmaVersion < 6 || !this.eat(cr.eq)))
        return s
      var i = this.startNodeAt(e, t)
      return (
        (i.left = s), (i.right = this.parseMaybeAssign()), this.finishNode(i, 'AssignmentPattern')
      )
    }),
    (Br.checkLValSimple = function (e, t, s) {
      void 0 === t && (t = 0)
      var i = 0 !== t
      switch (e.type) {
        case 'Identifier':
          this.strict &&
            this.reservedWordsStrictBind.test(e.name) &&
            this.raiseRecoverable(
              e.start,
              (i ? 'Binding ' : 'Assigning to ') + e.name + ' in strict mode'
            ),
            i &&
              (2 === t &&
                'let' === e.name &&
                this.raiseRecoverable(e.start, 'let is disallowed as a lexically bound name'),
              s &&
                (vr(s, e.name) && this.raiseRecoverable(e.start, 'Argument name clash'),
                (s[e.name] = !0)),
              5 !== t && this.declareName(e.name, t, e.start))
          break
        case 'ChainExpression':
          this.raiseRecoverable(e.start, 'Optional chaining cannot appear in left-hand side')
          break
        case 'MemberExpression':
          i && this.raiseRecoverable(e.start, 'Binding member expression')
          break
        case 'ParenthesizedExpression':
          return (
            i && this.raiseRecoverable(e.start, 'Binding parenthesized expression'),
            this.checkLValSimple(e.expression, t, s)
          )
        default:
          this.raise(e.start, (i ? 'Binding' : 'Assigning to') + ' rvalue')
      }
    }),
    (Br.checkLValPattern = function (e, t, s) {
      switch ((void 0 === t && (t = 0), e.type)) {
        case 'ObjectPattern':
          for (var i = 0, n = e.properties; i < n.length; i += 1) {
            var r = n[i]
            this.checkLValInnerPattern(r, t, s)
          }
          break
        case 'ArrayPattern':
          for (var a = 0, o = e.elements; a < o.length; a += 1) {
            var h = o[a]
            h && this.checkLValInnerPattern(h, t, s)
          }
          break
        default:
          this.checkLValSimple(e, t, s)
      }
    }),
    (Br.checkLValInnerPattern = function (e, t, s) {
      switch ((void 0 === t && (t = 0), e.type)) {
        case 'Property':
          this.checkLValInnerPattern(e.value, t, s)
          break
        case 'AssignmentPattern':
          this.checkLValPattern(e.left, t, s)
          break
        case 'RestElement':
          this.checkLValPattern(e.argument, t, s)
          break
        default:
          this.checkLValPattern(e, t, s)
      }
    })
  var Fr = Pr.prototype
  ;(Fr.checkPropClash = function (e, t, s) {
    if (
      !(
        (this.options.ecmaVersion >= 9 && 'SpreadElement' === e.type) ||
        (this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))
      )
    ) {
      var i,
        n = e.key
      switch (n.type) {
        case 'Identifier':
          i = n.name
          break
        case 'Literal':
          i = String(n.value)
          break
        default:
          return
      }
      var r = e.kind
      if (this.options.ecmaVersion >= 6)
        '__proto__' === i &&
          'init' === r &&
          (t.proto &&
            (s
              ? s.doubleProto < 0 && (s.doubleProto = n.start)
              : this.raiseRecoverable(n.start, 'Redefinition of __proto__ property')),
          (t.proto = !0))
      else {
        var a = t[(i = '$' + i)]
        a
          ? ('init' === r ? (this.strict && a.init) || a.get || a.set : a.init || a[r]) &&
            this.raiseRecoverable(n.start, 'Redefinition of property')
          : (a = t[i] = { init: !1, get: !1, set: !1 }),
          (a[r] = !0)
      }
    }
  }),
    (Fr.parseExpression = function (e, t) {
      var s = this.start,
        i = this.startLoc,
        n = this.parseMaybeAssign(e, t)
      if (this.type === cr.comma) {
        var r = this.startNodeAt(s, i)
        for (r.expressions = [n]; this.eat(cr.comma); )
          r.expressions.push(this.parseMaybeAssign(e, t))
        return this.finishNode(r, 'SequenceExpression')
      }
      return n
    }),
    (Fr.parseMaybeAssign = function (e, t, s) {
      if (this.isContextual('yield')) {
        if (this.inGenerator) return this.parseYield(e)
        this.exprAllowed = !1
      }
      var i = !1,
        n = -1,
        r = -1
      t
        ? ((n = t.parenthesizedAssign),
          (r = t.trailingComma),
          (t.parenthesizedAssign = t.trailingComma = -1))
        : ((t = new Lr()), (i = !0))
      var a = this.start,
        o = this.startLoc
      ;(this.type !== cr.parenL && this.type !== cr.name) || (this.potentialArrowAt = this.start)
      var h = this.parseMaybeConditional(e, t)
      if ((s && (h = s.call(this, h, a, o)), this.type.isAssign)) {
        var l = this.startNodeAt(a, o)
        return (
          (l.operator = this.value),
          this.type === cr.eq && (h = this.toAssignable(h, !1, t)),
          i || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1),
          t.shorthandAssign >= h.start && (t.shorthandAssign = -1),
          this.type === cr.eq ? this.checkLValPattern(h) : this.checkLValSimple(h),
          (l.left = h),
          this.next(),
          (l.right = this.parseMaybeAssign(e)),
          this.finishNode(l, 'AssignmentExpression')
        )
      }
      return (
        i && this.checkExpressionErrors(t, !0),
        n > -1 && (t.parenthesizedAssign = n),
        r > -1 && (t.trailingComma = r),
        h
      )
    }),
    (Fr.parseMaybeConditional = function (e, t) {
      var s = this.start,
        i = this.startLoc,
        n = this.parseExprOps(e, t)
      if (this.checkExpressionErrors(t)) return n
      if (this.eat(cr.question)) {
        var r = this.startNodeAt(s, i)
        return (
          (r.test = n),
          (r.consequent = this.parseMaybeAssign()),
          this.expect(cr.colon),
          (r.alternate = this.parseMaybeAssign(e)),
          this.finishNode(r, 'ConditionalExpression')
        )
      }
      return n
    }),
    (Fr.parseExprOps = function (e, t) {
      var s = this.start,
        i = this.startLoc,
        n = this.parseMaybeUnary(t, !1)
      return this.checkExpressionErrors(t) ||
        (n.start === s && 'ArrowFunctionExpression' === n.type)
        ? n
        : this.parseExprOp(n, s, i, -1, e)
    }),
    (Fr.parseExprOp = function (e, t, s, i, n) {
      var r = this.type.binop
      if (null != r && (!n || this.type !== cr._in) && r > i) {
        var a = this.type === cr.logicalOR || this.type === cr.logicalAND,
          o = this.type === cr.coalesce
        o && (r = cr.logicalAND.binop)
        var h = this.value
        this.next()
        var l = this.start,
          c = this.startLoc,
          u = this.parseExprOp(this.parseMaybeUnary(null, !1), l, c, r, n),
          p = this.buildBinary(t, s, e, u, h, a || o)
        return (
          ((a && this.type === cr.coalesce) ||
            (o && (this.type === cr.logicalOR || this.type === cr.logicalAND))) &&
            this.raiseRecoverable(
              this.start,
              'Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses'
            ),
          this.parseExprOp(p, t, s, i, n)
        )
      }
      return e
    }),
    (Fr.buildBinary = function (e, t, s, i, n, r) {
      var a = this.startNodeAt(e, t)
      return (
        (a.left = s),
        (a.operator = n),
        (a.right = i),
        this.finishNode(a, r ? 'LogicalExpression' : 'BinaryExpression')
      )
    }),
    (Fr.parseMaybeUnary = function (e, t) {
      var s,
        i = this.start,
        n = this.startLoc
      if (
        this.isContextual('await') &&
        (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction))
      )
        (s = this.parseAwait()), (t = !0)
      else if (this.type.prefix) {
        var r = this.startNode(),
          a = this.type === cr.incDec
        ;(r.operator = this.value),
          (r.prefix = !0),
          this.next(),
          (r.argument = this.parseMaybeUnary(null, !0)),
          this.checkExpressionErrors(e, !0),
          a
            ? this.checkLValSimple(r.argument)
            : this.strict && 'delete' === r.operator && 'Identifier' === r.argument.type
              ? this.raiseRecoverable(r.start, 'Deleting local variable in strict mode')
              : (t = !0),
          (s = this.finishNode(r, a ? 'UpdateExpression' : 'UnaryExpression'))
      } else {
        if (((s = this.parseExprSubscripts(e)), this.checkExpressionErrors(e))) return s
        for (; this.type.postfix && !this.canInsertSemicolon(); ) {
          var o = this.startNodeAt(i, n)
          ;(o.operator = this.value),
            (o.prefix = !1),
            (o.argument = s),
            this.checkLValSimple(s),
            this.next(),
            (s = this.finishNode(o, 'UpdateExpression'))
        }
      }
      return !t && this.eat(cr.starstar)
        ? this.buildBinary(i, n, s, this.parseMaybeUnary(null, !1), '**', !1)
        : s
    }),
    (Fr.parseExprSubscripts = function (e) {
      var t = this.start,
        s = this.startLoc,
        i = this.parseExprAtom(e)
      if (
        'ArrowFunctionExpression' === i.type &&
        ')' !== this.input.slice(this.lastTokStart, this.lastTokEnd)
      )
        return i
      var n = this.parseSubscripts(i, t, s)
      return (
        e &&
          'MemberExpression' === n.type &&
          (e.parenthesizedAssign >= n.start && (e.parenthesizedAssign = -1),
          e.parenthesizedBind >= n.start && (e.parenthesizedBind = -1)),
        n
      )
    }),
    (Fr.parseSubscripts = function (e, t, s, i) {
      for (
        var n =
            this.options.ecmaVersion >= 8 &&
            'Identifier' === e.type &&
            'async' === e.name &&
            this.lastTokEnd === e.end &&
            !this.canInsertSemicolon() &&
            e.end - e.start == 5 &&
            this.potentialArrowAt === e.start,
          r = !1;
        ;

      ) {
        var a = this.parseSubscript(e, t, s, i, n, r)
        if ((a.optional && (r = !0), a === e || 'ArrowFunctionExpression' === a.type)) {
          if (r) {
            var o = this.startNodeAt(t, s)
            ;(o.expression = a), (a = this.finishNode(o, 'ChainExpression'))
          }
          return a
        }
        e = a
      }
    }),
    (Fr.parseSubscript = function (e, t, s, i, n, r) {
      var a = this.options.ecmaVersion >= 11,
        o = a && this.eat(cr.questionDot)
      i &&
        o &&
        this.raise(
          this.lastTokStart,
          'Optional chaining cannot appear in the callee of new expressions'
        )
      var h = this.eat(cr.bracketL)
      if (h || (o && this.type !== cr.parenL && this.type !== cr.backQuote) || this.eat(cr.dot)) {
        var l = this.startNodeAt(t, s)
        ;(l.object = e),
          (l.property = h
            ? this.parseExpression()
            : this.parseIdent('never' !== this.options.allowReserved)),
          (l.computed = !!h),
          h && this.expect(cr.bracketR),
          a && (l.optional = o),
          (e = this.finishNode(l, 'MemberExpression'))
      } else if (!i && this.eat(cr.parenL)) {
        var c = new Lr(),
          u = this.yieldPos,
          p = this.awaitPos,
          d = this.awaitIdentPos
        ;(this.yieldPos = 0), (this.awaitPos = 0), (this.awaitIdentPos = 0)
        var f = this.parseExprList(cr.parenR, this.options.ecmaVersion >= 8, !1, c)
        if (n && !o && !this.canInsertSemicolon() && this.eat(cr.arrow))
          return (
            this.checkPatternErrors(c, !1),
            this.checkYieldAwaitInDefaultParams(),
            this.awaitIdentPos > 0 &&
              this.raise(
                this.awaitIdentPos,
                "Cannot use 'await' as identifier inside an async function"
              ),
            (this.yieldPos = u),
            (this.awaitPos = p),
            (this.awaitIdentPos = d),
            this.parseArrowExpression(this.startNodeAt(t, s), f, !0)
          )
        this.checkExpressionErrors(c, !0),
          (this.yieldPos = u || this.yieldPos),
          (this.awaitPos = p || this.awaitPos),
          (this.awaitIdentPos = d || this.awaitIdentPos)
        var m = this.startNodeAt(t, s)
        ;(m.callee = e),
          (m.arguments = f),
          a && (m.optional = o),
          (e = this.finishNode(m, 'CallExpression'))
      } else if (this.type === cr.backQuote) {
        ;(o || r) &&
          this.raise(
            this.start,
            'Optional chaining cannot appear in the tag of tagged template expressions'
          )
        var g = this.startNodeAt(t, s)
        ;(g.tag = e),
          (g.quasi = this.parseTemplate({ isTagged: !0 })),
          (e = this.finishNode(g, 'TaggedTemplateExpression'))
      }
      return e
    }),
    (Fr.parseExprAtom = function (e) {
      this.type === cr.slash && this.readRegexp()
      var t,
        s = this.potentialArrowAt === this.start
      switch (this.type) {
        case cr._super:
          return (
            this.allowSuper || this.raise(this.start, "'super' keyword outside a method"),
            (t = this.startNode()),
            this.next(),
            this.type !== cr.parenL ||
              this.allowDirectSuper ||
              this.raise(t.start, 'super() call outside constructor of a subclass'),
            this.type !== cr.dot &&
              this.type !== cr.bracketL &&
              this.type !== cr.parenL &&
              this.unexpected(),
            this.finishNode(t, 'Super')
          )
        case cr._this:
          return (t = this.startNode()), this.next(), this.finishNode(t, 'ThisExpression')
        case cr.name:
          var i = this.start,
            n = this.startLoc,
            r = this.containsEsc,
            a = this.parseIdent(!1)
          if (
            this.options.ecmaVersion >= 8 &&
            !r &&
            'async' === a.name &&
            !this.canInsertSemicolon() &&
            this.eat(cr._function)
          )
            return this.parseFunction(this.startNodeAt(i, n), 0, !1, !0)
          if (s && !this.canInsertSemicolon()) {
            if (this.eat(cr.arrow))
              return this.parseArrowExpression(this.startNodeAt(i, n), [a], !1)
            if (this.options.ecmaVersion >= 8 && 'async' === a.name && this.type === cr.name && !r)
              return (
                (a = this.parseIdent(!1)),
                (!this.canInsertSemicolon() && this.eat(cr.arrow)) || this.unexpected(),
                this.parseArrowExpression(this.startNodeAt(i, n), [a], !0)
              )
          }
          return a
        case cr.regexp:
          var o = this.value
          return (
            ((t = this.parseLiteral(o.value)).regex = { pattern: o.pattern, flags: o.flags }), t
          )
        case cr.num:
        case cr.string:
          return this.parseLiteral(this.value)
        case cr._null:
        case cr._true:
        case cr._false:
          return (
            ((t = this.startNode()).value = this.type === cr._null ? null : this.type === cr._true),
            (t.raw = this.type.keyword),
            this.next(),
            this.finishNode(t, 'Literal')
          )
        case cr.parenL:
          var h = this.start,
            l = this.parseParenAndDistinguishExpression(s)
          return (
            e &&
              (e.parenthesizedAssign < 0 &&
                !this.isSimpleAssignTarget(l) &&
                (e.parenthesizedAssign = h),
              e.parenthesizedBind < 0 && (e.parenthesizedBind = h)),
            l
          )
        case cr.bracketL:
          return (
            (t = this.startNode()),
            this.next(),
            (t.elements = this.parseExprList(cr.bracketR, !0, !0, e)),
            this.finishNode(t, 'ArrayExpression')
          )
        case cr.braceL:
          return this.parseObj(!1, e)
        case cr._function:
          return (t = this.startNode()), this.next(), this.parseFunction(t, 0)
        case cr._class:
          return this.parseClass(this.startNode(), !1)
        case cr._new:
          return this.parseNew()
        case cr.backQuote:
          return this.parseTemplate()
        case cr._import:
          return this.options.ecmaVersion >= 11 ? this.parseExprImport() : this.unexpected()
        default:
          this.unexpected()
      }
    }),
    (Fr.parseExprImport = function () {
      var e = this.startNode()
      this.containsEsc && this.raiseRecoverable(this.start, 'Escape sequence in keyword import')
      var t = this.parseIdent(!0)
      switch (this.type) {
        case cr.parenL:
          return this.parseDynamicImport(e)
        case cr.dot:
          return (e.meta = t), this.parseImportMeta(e)
        default:
          this.unexpected()
      }
    }),
    (Fr.parseDynamicImport = function (e) {
      if ((this.next(), (e.source = this.parseMaybeAssign()), !this.eat(cr.parenR))) {
        var t = this.start
        this.eat(cr.comma) && this.eat(cr.parenR)
          ? this.raiseRecoverable(t, 'Trailing comma is not allowed in import()')
          : this.unexpected(t)
      }
      return this.finishNode(e, 'ImportExpression')
    }),
    (Fr.parseImportMeta = function (e) {
      this.next()
      var t = this.containsEsc
      return (
        (e.property = this.parseIdent(!0)),
        'meta' !== e.property.name &&
          this.raiseRecoverable(
            e.property.start,
            "The only valid meta property for import is 'import.meta'"
          ),
        t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"),
        'module' !== this.options.sourceType &&
          this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"),
        this.finishNode(e, 'MetaProperty')
      )
    }),
    (Fr.parseLiteral = function (e) {
      var t = this.startNode()
      return (
        (t.value = e),
        (t.raw = this.input.slice(this.start, this.end)),
        110 === t.raw.charCodeAt(t.raw.length - 1) &&
          (t.bigint = t.raw.slice(0, -1).replace(/_/g, '')),
        this.next(),
        this.finishNode(t, 'Literal')
      )
    }),
    (Fr.parseParenExpression = function () {
      this.expect(cr.parenL)
      var e = this.parseExpression()
      return this.expect(cr.parenR), e
    }),
    (Fr.parseParenAndDistinguishExpression = function (e) {
      var t,
        s = this.start,
        i = this.startLoc,
        n = this.options.ecmaVersion >= 8
      if (this.options.ecmaVersion >= 6) {
        this.next()
        var r,
          a = this.start,
          o = this.startLoc,
          h = [],
          l = !0,
          c = !1,
          u = new Lr(),
          p = this.yieldPos,
          d = this.awaitPos
        for (this.yieldPos = 0, this.awaitPos = 0; this.type !== cr.parenR; ) {
          if ((l ? (l = !1) : this.expect(cr.comma), n && this.afterTrailingComma(cr.parenR, !0))) {
            c = !0
            break
          }
          if (this.type === cr.ellipsis) {
            ;(r = this.start),
              h.push(this.parseParenItem(this.parseRestBinding())),
              this.type === cr.comma &&
                this.raise(this.start, 'Comma is not permitted after the rest element')
            break
          }
          h.push(this.parseMaybeAssign(!1, u, this.parseParenItem))
        }
        var f = this.start,
          m = this.startLoc
        if ((this.expect(cr.parenR), e && !this.canInsertSemicolon() && this.eat(cr.arrow)))
          return (
            this.checkPatternErrors(u, !1),
            this.checkYieldAwaitInDefaultParams(),
            (this.yieldPos = p),
            (this.awaitPos = d),
            this.parseParenArrowList(s, i, h)
          )
        ;(h.length && !c) || this.unexpected(this.lastTokStart),
          r && this.unexpected(r),
          this.checkExpressionErrors(u, !0),
          (this.yieldPos = p || this.yieldPos),
          (this.awaitPos = d || this.awaitPos),
          h.length > 1
            ? (((t = this.startNodeAt(a, o)).expressions = h),
              this.finishNodeAt(t, 'SequenceExpression', f, m))
            : (t = h[0])
      } else t = this.parseParenExpression()
      if (this.options.preserveParens) {
        var g = this.startNodeAt(s, i)
        return (g.expression = t), this.finishNode(g, 'ParenthesizedExpression')
      }
      return t
    }),
    (Fr.parseParenItem = function (e) {
      return e
    }),
    (Fr.parseParenArrowList = function (e, t, s) {
      return this.parseArrowExpression(this.startNodeAt(e, t), s)
    })
  var Wr = []
  ;(Fr.parseNew = function () {
    this.containsEsc && this.raiseRecoverable(this.start, 'Escape sequence in keyword new')
    var e = this.startNode(),
      t = this.parseIdent(!0)
    if (this.options.ecmaVersion >= 6 && this.eat(cr.dot)) {
      e.meta = t
      var s = this.containsEsc
      return (
        (e.property = this.parseIdent(!0)),
        'target' !== e.property.name &&
          this.raiseRecoverable(
            e.property.start,
            "The only valid meta property for new is 'new.target'"
          ),
        s && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"),
        this.inNonArrowFunction ||
          this.raiseRecoverable(e.start, "'new.target' can only be used in functions"),
        this.finishNode(e, 'MetaProperty')
      )
    }
    var i = this.start,
      n = this.startLoc,
      r = this.type === cr._import
    return (
      (e.callee = this.parseSubscripts(this.parseExprAtom(), i, n, !0)),
      r && 'ImportExpression' === e.callee.type && this.raise(i, 'Cannot use new with import()'),
      this.eat(cr.parenL)
        ? (e.arguments = this.parseExprList(cr.parenR, this.options.ecmaVersion >= 8, !1))
        : (e.arguments = Wr),
      this.finishNode(e, 'NewExpression')
    )
  }),
    (Fr.parseTemplateElement = function (e) {
      var t = e.isTagged,
        s = this.startNode()
      return (
        this.type === cr.invalidTemplate
          ? (t ||
              this.raiseRecoverable(this.start, 'Bad escape sequence in untagged template literal'),
            (s.value = { raw: this.value, cooked: null }))
          : (s.value = {
              raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, '\n'),
              cooked: this.value
            }),
        this.next(),
        (s.tail = this.type === cr.backQuote),
        this.finishNode(s, 'TemplateElement')
      )
    }),
    (Fr.parseTemplate = function (e) {
      void 0 === e && (e = {})
      var t = e.isTagged
      void 0 === t && (t = !1)
      var s = this.startNode()
      this.next(), (s.expressions = [])
      var i = this.parseTemplateElement({ isTagged: t })
      for (s.quasis = [i]; !i.tail; )
        this.type === cr.eof && this.raise(this.pos, 'Unterminated template literal'),
          this.expect(cr.dollarBraceL),
          s.expressions.push(this.parseExpression()),
          this.expect(cr.braceR),
          s.quasis.push((i = this.parseTemplateElement({ isTagged: t })))
      return this.next(), this.finishNode(s, 'TemplateLiteral')
    }),
    (Fr.isAsyncProp = function (e) {
      return (
        !e.computed &&
        'Identifier' === e.key.type &&
        'async' === e.key.name &&
        (this.type === cr.name ||
          this.type === cr.num ||
          this.type === cr.string ||
          this.type === cr.bracketL ||
          this.type.keyword ||
          (this.options.ecmaVersion >= 9 && this.type === cr.star)) &&
        !ur.test(this.input.slice(this.lastTokEnd, this.start))
      )
    }),
    (Fr.parseObj = function (e, t) {
      var s = this.startNode(),
        i = !0,
        n = {}
      for (s.properties = [], this.next(); !this.eat(cr.braceR); ) {
        if (i) i = !1
        else if (
          (this.expect(cr.comma),
          this.options.ecmaVersion >= 5 && this.afterTrailingComma(cr.braceR))
        )
          break
        var r = this.parseProperty(e, t)
        e || this.checkPropClash(r, n, t), s.properties.push(r)
      }
      return this.finishNode(s, e ? 'ObjectPattern' : 'ObjectExpression')
    }),
    (Fr.parseProperty = function (e, t) {
      var s,
        i,
        n,
        r,
        a = this.startNode()
      if (this.options.ecmaVersion >= 9 && this.eat(cr.ellipsis))
        return e
          ? ((a.argument = this.parseIdent(!1)),
            this.type === cr.comma &&
              this.raise(this.start, 'Comma is not permitted after the rest element'),
            this.finishNode(a, 'RestElement'))
          : (this.type === cr.parenL &&
              t &&
              (t.parenthesizedAssign < 0 && (t.parenthesizedAssign = this.start),
              t.parenthesizedBind < 0 && (t.parenthesizedBind = this.start)),
            (a.argument = this.parseMaybeAssign(!1, t)),
            this.type === cr.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start),
            this.finishNode(a, 'SpreadElement'))
      this.options.ecmaVersion >= 6 &&
        ((a.method = !1),
        (a.shorthand = !1),
        (e || t) && ((n = this.start), (r = this.startLoc)),
        e || (s = this.eat(cr.star)))
      var o = this.containsEsc
      return (
        this.parsePropertyName(a),
        !e && !o && this.options.ecmaVersion >= 8 && !s && this.isAsyncProp(a)
          ? ((i = !0),
            (s = this.options.ecmaVersion >= 9 && this.eat(cr.star)),
            this.parsePropertyName(a, t))
          : (i = !1),
        this.parsePropertyValue(a, e, s, i, n, r, t, o),
        this.finishNode(a, 'Property')
      )
    }),
    (Fr.parsePropertyValue = function (e, t, s, i, n, r, a, o) {
      if (((s || i) && this.type === cr.colon && this.unexpected(), this.eat(cr.colon)))
        (e.value = t
          ? this.parseMaybeDefault(this.start, this.startLoc)
          : this.parseMaybeAssign(!1, a)),
          (e.kind = 'init')
      else if (this.options.ecmaVersion >= 6 && this.type === cr.parenL)
        t && this.unexpected(),
          (e.kind = 'init'),
          (e.method = !0),
          (e.value = this.parseMethod(s, i))
      else if (
        t ||
        o ||
        !(this.options.ecmaVersion >= 5) ||
        e.computed ||
        'Identifier' !== e.key.type ||
        ('get' !== e.key.name && 'set' !== e.key.name) ||
        this.type === cr.comma ||
        this.type === cr.braceR ||
        this.type === cr.eq
      )
        this.options.ecmaVersion >= 6 && !e.computed && 'Identifier' === e.key.type
          ? ((s || i) && this.unexpected(),
            this.checkUnreserved(e.key),
            'await' !== e.key.name || this.awaitIdentPos || (this.awaitIdentPos = n),
            (e.kind = 'init'),
            t
              ? (e.value = this.parseMaybeDefault(n, r, this.copyNode(e.key)))
              : this.type === cr.eq && a
                ? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start),
                  (e.value = this.parseMaybeDefault(n, r, this.copyNode(e.key))))
                : (e.value = this.copyNode(e.key)),
            (e.shorthand = !0))
          : this.unexpected()
      else {
        ;(s || i) && this.unexpected(),
          (e.kind = e.key.name),
          this.parsePropertyName(e),
          (e.value = this.parseMethod(!1))
        var h = 'get' === e.kind ? 0 : 1
        if (e.value.params.length !== h) {
          var l = e.value.start
          'get' === e.kind
            ? this.raiseRecoverable(l, 'getter should have no params')
            : this.raiseRecoverable(l, 'setter should have exactly one param')
        } else
          'set' === e.kind &&
            'RestElement' === e.value.params[0].type &&
            this.raiseRecoverable(e.value.params[0].start, 'Setter cannot use rest params')
      }
    }),
    (Fr.parsePropertyName = function (e) {
      if (this.options.ecmaVersion >= 6) {
        if (this.eat(cr.bracketL))
          return (
            (e.computed = !0), (e.key = this.parseMaybeAssign()), this.expect(cr.bracketR), e.key
          )
        e.computed = !1
      }
      return (e.key =
        this.type === cr.num || this.type === cr.string
          ? this.parseExprAtom()
          : this.parseIdent('never' !== this.options.allowReserved))
    }),
    (Fr.initFunction = function (e) {
      ;(e.id = null),
        this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1),
        this.options.ecmaVersion >= 8 && (e.async = !1)
    }),
    (Fr.parseMethod = function (e, t, s) {
      var i = this.startNode(),
        n = this.yieldPos,
        r = this.awaitPos,
        a = this.awaitIdentPos
      return (
        this.initFunction(i),
        this.options.ecmaVersion >= 6 && (i.generator = e),
        this.options.ecmaVersion >= 8 && (i.async = !!t),
        (this.yieldPos = 0),
        (this.awaitPos = 0),
        (this.awaitIdentPos = 0),
        this.enterScope(64 | wr(t, i.generator) | (s ? 128 : 0)),
        this.expect(cr.parenL),
        (i.params = this.parseBindingList(cr.parenR, !1, this.options.ecmaVersion >= 8)),
        this.checkYieldAwaitInDefaultParams(),
        this.parseFunctionBody(i, !1, !0),
        (this.yieldPos = n),
        (this.awaitPos = r),
        (this.awaitIdentPos = a),
        this.finishNode(i, 'FunctionExpression')
      )
    }),
    (Fr.parseArrowExpression = function (e, t, s) {
      var i = this.yieldPos,
        n = this.awaitPos,
        r = this.awaitIdentPos
      return (
        this.enterScope(16 | wr(s, !1)),
        this.initFunction(e),
        this.options.ecmaVersion >= 8 && (e.async = !!s),
        (this.yieldPos = 0),
        (this.awaitPos = 0),
        (this.awaitIdentPos = 0),
        (e.params = this.toAssignableList(t, !0)),
        this.parseFunctionBody(e, !0, !1),
        (this.yieldPos = i),
        (this.awaitPos = n),
        (this.awaitIdentPos = r),
        this.finishNode(e, 'ArrowFunctionExpression')
      )
    }),
    (Fr.parseFunctionBody = function (e, t, s) {
      var i = t && this.type !== cr.braceL,
        n = this.strict,
        r = !1
      if (i) (e.body = this.parseMaybeAssign()), (e.expression = !0), this.checkParams(e, !1)
      else {
        var a = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params)
        ;(n && !a) ||
          ((r = this.strictDirective(this.end)) &&
            a &&
            this.raiseRecoverable(
              e.start,
              "Illegal 'use strict' directive in function with non-simple parameter list"
            ))
        var o = this.labels
        ;(this.labels = []),
          r && (this.strict = !0),
          this.checkParams(e, !n && !r && !t && !s && this.isSimpleParamList(e.params)),
          this.strict && e.id && this.checkLValSimple(e.id, 5),
          (e.body = this.parseBlock(!1, void 0, r && !n)),
          (e.expression = !1),
          this.adaptDirectivePrologue(e.body.body),
          (this.labels = o)
      }
      this.exitScope()
    }),
    (Fr.isSimpleParamList = function (e) {
      for (var t = 0, s = e; t < s.length; t += 1) if ('Identifier' !== s[t].type) return !1
      return !0
    }),
    (Fr.checkParams = function (e, t) {
      for (var s = {}, i = 0, n = e.params; i < n.length; i += 1) {
        var r = n[i]
        this.checkLValInnerPattern(r, 1, t ? null : s)
      }
    }),
    (Fr.parseExprList = function (e, t, s, i) {
      for (var n = [], r = !0; !this.eat(e); ) {
        if (r) r = !1
        else if ((this.expect(cr.comma), t && this.afterTrailingComma(e))) break
        var a = void 0
        s && this.type === cr.comma
          ? (a = null)
          : this.type === cr.ellipsis
            ? ((a = this.parseSpread(i)),
              i && this.type === cr.comma && i.trailingComma < 0 && (i.trailingComma = this.start))
            : (a = this.parseMaybeAssign(!1, i)),
          n.push(a)
      }
      return n
    }),
    (Fr.checkUnreserved = function (e) {
      var t = e.start,
        s = e.end,
        i = e.name
      this.inGenerator &&
        'yield' === i &&
        this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"),
        this.inAsync &&
          'await' === i &&
          this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"),
        this.keywords.test(i) && this.raise(t, "Unexpected keyword '" + i + "'"),
        (this.options.ecmaVersion < 6 && -1 !== this.input.slice(t, s).indexOf('\\')) ||
          ((this.strict ? this.reservedWordsStrict : this.reservedWords).test(i) &&
            (this.inAsync ||
              'await' !== i ||
              this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"),
            this.raiseRecoverable(t, "The keyword '" + i + "' is reserved")))
    }),
    (Fr.parseIdent = function (e, t) {
      var s = this.startNode()
      return (
        this.type === cr.name
          ? (s.name = this.value)
          : this.type.keyword
            ? ((s.name = this.type.keyword),
              ('class' !== s.name && 'function' !== s.name) ||
                (this.lastTokEnd === this.lastTokStart + 1 &&
                  46 === this.input.charCodeAt(this.lastTokStart)) ||
                this.context.pop())
            : this.unexpected(),
        this.next(!!e),
        this.finishNode(s, 'Identifier'),
        e ||
          (this.checkUnreserved(s),
          'await' !== s.name || this.awaitIdentPos || (this.awaitIdentPos = s.start)),
        s
      )
    }),
    (Fr.parseYield = function (e) {
      this.yieldPos || (this.yieldPos = this.start)
      var t = this.startNode()
      return (
        this.next(),
        this.type === cr.semi ||
        this.canInsertSemicolon() ||
        (this.type !== cr.star && !this.type.startsExpr)
          ? ((t.delegate = !1), (t.argument = null))
          : ((t.delegate = this.eat(cr.star)), (t.argument = this.parseMaybeAssign(e))),
        this.finishNode(t, 'YieldExpression')
      )
    }),
    (Fr.parseAwait = function () {
      this.awaitPos || (this.awaitPos = this.start)
      var e = this.startNode()
      return (
        this.next(),
        (e.argument = this.parseMaybeUnary(null, !1)),
        this.finishNode(e, 'AwaitExpression')
      )
    })
  var Ur = Pr.prototype
  ;(Ur.raise = function (e, t) {
    var s = Ar(this.input, e)
    t += ' (' + s.line + ':' + s.column + ')'
    var i = new SyntaxError(t)
    throw ((i.pos = e), (i.loc = s), (i.raisedAt = this.pos), i)
  }),
    (Ur.raiseRecoverable = Ur.raise),
    (Ur.curPosition = function () {
      if (this.options.locations) return new Sr(this.curLine, this.pos - this.lineStart)
    })
  var jr = Pr.prototype,
    zr = function (e) {
      ;(this.flags = e), (this.var = []), (this.lexical = []), (this.functions = [])
    }
  ;(jr.enterScope = function (e) {
    this.scopeStack.push(new zr(e))
  }),
    (jr.exitScope = function () {
      this.scopeStack.pop()
    }),
    (jr.treatFunctionsAsVarInScope = function (e) {
      return 2 & e.flags || (!this.inModule && 1 & e.flags)
    }),
    (jr.declareName = function (e, t, s) {
      var i = !1
      if (2 === t) {
        var n = this.currentScope()
        ;(i = n.lexical.indexOf(e) > -1 || n.functions.indexOf(e) > -1 || n.var.indexOf(e) > -1),
          n.lexical.push(e),
          this.inModule && 1 & n.flags && delete this.undefinedExports[e]
      } else if (4 === t) this.currentScope().lexical.push(e)
      else if (3 === t) {
        var r = this.currentScope()
        ;(i = this.treatFunctionsAsVar
          ? r.lexical.indexOf(e) > -1
          : r.lexical.indexOf(e) > -1 || r.var.indexOf(e) > -1),
          r.functions.push(e)
      } else
        for (var a = this.scopeStack.length - 1; a >= 0; --a) {
          var o = this.scopeStack[a]
          if (
            (o.lexical.indexOf(e) > -1 && !(32 & o.flags && o.lexical[0] === e)) ||
            (!this.treatFunctionsAsVarInScope(o) && o.functions.indexOf(e) > -1)
          ) {
            i = !0
            break
          }
          if (
            (o.var.push(e),
            this.inModule && 1 & o.flags && delete this.undefinedExports[e],
            3 & o.flags)
          )
            break
        }
      i && this.raiseRecoverable(s, "Identifier '" + e + "' has already been declared")
    }),
    (jr.checkLocalExport = function (e) {
      ;-1 === this.scopeStack[0].lexical.indexOf(e.name) &&
        -1 === this.scopeStack[0].var.indexOf(e.name) &&
        (this.undefinedExports[e.name] = e)
    }),
    (jr.currentScope = function () {
      return this.scopeStack[this.scopeStack.length - 1]
    }),
    (jr.currentVarScope = function () {
      for (var e = this.scopeStack.length - 1; ; e--) {
        var t = this.scopeStack[e]
        if (3 & t.flags) return t
      }
    }),
    (jr.currentThisScope = function () {
      for (var e = this.scopeStack.length - 1; ; e--) {
        var t = this.scopeStack[e]
        if (3 & t.flags && !(16 & t.flags)) return t
      }
    })
  var Gr = function (e, t, s) {
      ;(this.type = ''),
        (this.start = t),
        (this.end = 0),
        e.options.locations && (this.loc = new _r(e, s)),
        e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile),
        e.options.ranges && (this.range = [t, 0])
    },
    Hr = Pr.prototype
  function qr(e, t, s, i) {
    return (
      (e.type = t),
      (e.end = s),
      this.options.locations && (e.loc.end = i),
      this.options.ranges && (e.range[1] = s),
      e
    )
  }
  ;(Hr.startNode = function () {
    return new Gr(this, this.start, this.startLoc)
  }),
    (Hr.startNodeAt = function (e, t) {
      return new Gr(this, e, t)
    }),
    (Hr.finishNode = function (e, t) {
      return qr.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc)
    }),
    (Hr.finishNodeAt = function (e, t, s, i) {
      return qr.call(this, e, t, s, i)
    }),
    (Hr.copyNode = function (e) {
      var t = new Gr(this, e.start, this.startLoc)
      for (var s in e) t[s] = e[s]
      return t
    })
  var Kr = function (e, t, s, i, n) {
      ;(this.token = e),
        (this.isExpr = !!t),
        (this.preserveSpace = !!s),
        (this.override = i),
        (this.generator = !!n)
    },
    Xr = {
      b_stat: new Kr('{', !1),
      b_expr: new Kr('{', !0),
      b_tmpl: new Kr('${', !1),
      p_stat: new Kr('(', !1),
      p_expr: new Kr('(', !0),
      q_tmpl: new Kr('`', !0, !0, function (e) {
        return e.tryReadTemplateToken()
      }),
      f_stat: new Kr('function', !1),
      f_expr: new Kr('function', !0),
      f_expr_gen: new Kr('function', !0, !1, null, !0),
      f_gen: new Kr('function', !1, !1, null, !0)
    },
    Yr = Pr.prototype
  ;(Yr.initialContext = function () {
    return [Xr.b_stat]
  }),
    (Yr.braceIsBlock = function (e) {
      var t = this.curContext()
      return (
        t === Xr.f_expr ||
        t === Xr.f_stat ||
        (e !== cr.colon || (t !== Xr.b_stat && t !== Xr.b_expr)
          ? e === cr._return || (e === cr.name && this.exprAllowed)
            ? ur.test(this.input.slice(this.lastTokEnd, this.start))
            : e === cr._else ||
              e === cr.semi ||
              e === cr.eof ||
              e === cr.parenR ||
              e === cr.arrow ||
              (e === cr.braceL
                ? t === Xr.b_stat
                : e !== cr._var && e !== cr._const && e !== cr.name && !this.exprAllowed)
          : !t.isExpr)
      )
    }),
    (Yr.inGeneratorContext = function () {
      for (var e = this.context.length - 1; e >= 1; e--) {
        var t = this.context[e]
        if ('function' === t.token) return t.generator
      }
      return !1
    }),
    (Yr.updateContext = function (e) {
      var t,
        s = this.type
      s.keyword && e === cr.dot
        ? (this.exprAllowed = !1)
        : (t = s.updateContext)
          ? t.call(this, e)
          : (this.exprAllowed = s.beforeExpr)
    }),
    (cr.parenR.updateContext = cr.braceR.updateContext =
      function () {
        if (1 !== this.context.length) {
          var e = this.context.pop()
          e === Xr.b_stat && 'function' === this.curContext().token && (e = this.context.pop()),
            (this.exprAllowed = !e.isExpr)
        } else this.exprAllowed = !0
      }),
    (cr.braceL.updateContext = function (e) {
      this.context.push(this.braceIsBlock(e) ? Xr.b_stat : Xr.b_expr), (this.exprAllowed = !0)
    }),
    (cr.dollarBraceL.updateContext = function () {
      this.context.push(Xr.b_tmpl), (this.exprAllowed = !0)
    }),
    (cr.parenL.updateContext = function (e) {
      var t = e === cr._if || e === cr._for || e === cr._with || e === cr._while
      this.context.push(t ? Xr.p_stat : Xr.p_expr), (this.exprAllowed = !0)
    }),
    (cr.incDec.updateContext = function () {}),
    (cr._function.updateContext = cr._class.updateContext =
      function (e) {
        !e.beforeExpr ||
        e === cr._else ||
        (e === cr.semi && this.curContext() !== Xr.p_stat) ||
        (e === cr._return && ur.test(this.input.slice(this.lastTokEnd, this.start))) ||
        ((e === cr.colon || e === cr.braceL) && this.curContext() === Xr.b_stat)
          ? this.context.push(Xr.f_stat)
          : this.context.push(Xr.f_expr),
          (this.exprAllowed = !1)
      }),
    (cr.backQuote.updateContext = function () {
      this.curContext() === Xr.q_tmpl ? this.context.pop() : this.context.push(Xr.q_tmpl),
        (this.exprAllowed = !1)
    }),
    (cr.star.updateContext = function (e) {
      if (e === cr._function) {
        var t = this.context.length - 1
        this.context[t] === Xr.f_expr
          ? (this.context[t] = Xr.f_expr_gen)
          : (this.context[t] = Xr.f_gen)
      }
      this.exprAllowed = !0
    }),
    (cr.name.updateContext = function (e) {
      var t = !1
      this.options.ecmaVersion >= 6 &&
        e !== cr.dot &&
        (('of' === this.value && !this.exprAllowed) ||
          ('yield' === this.value && this.inGeneratorContext())) &&
        (t = !0),
        (this.exprAllowed = t)
    })
  var Qr =
      'ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS',
    Jr = Qr + ' Extended_Pictographic',
    Zr = {
      9: Qr,
      10: Jr,
      11: Jr,
      12: 'ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS Extended_Pictographic EBase EComp EMod EPres ExtPict'
    },
    ea =
      'Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu',
    ta =
      'Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb',
    sa =
      ta +
      ' Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd',
    ia = {
      9: ta,
      10: sa,
      11: 'Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho',
      12: 'Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi'
    },
    na = {}
  function ra(e) {
    var t = (na[e] = {
      binary: br(Zr[e] + ' ' + ea),
      nonBinary: { General_Category: br(ea), Script: br(ia[e]) }
    })
    ;(t.nonBinary.Script_Extensions = t.nonBinary.Script),
      (t.nonBinary.gc = t.nonBinary.General_Category),
      (t.nonBinary.sc = t.nonBinary.Script),
      (t.nonBinary.scx = t.nonBinary.Script_Extensions)
  }
  ra(9), ra(10), ra(11), ra(12)
  var aa = Pr.prototype,
    oa = function (e) {
      ;(this.parser = e),
        (this.validFlags =
          'gim' +
          (e.options.ecmaVersion >= 6 ? 'uy' : '') +
          (e.options.ecmaVersion >= 9 ? 's' : '')),
        (this.unicodeProperties = na[e.options.ecmaVersion >= 12 ? 12 : e.options.ecmaVersion]),
        (this.source = ''),
        (this.flags = ''),
        (this.start = 0),
        (this.switchU = !1),
        (this.switchN = !1),
        (this.pos = 0),
        (this.lastIntValue = 0),
        (this.lastStringValue = ''),
        (this.lastAssertionIsQuantifiable = !1),
        (this.numCapturingParens = 0),
        (this.maxBackReference = 0),
        (this.groupNames = []),
        (this.backReferenceNames = [])
    }
  function ha(e) {
    return e <= 65535
      ? String.fromCharCode(e)
      : ((e -= 65536), String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)))
  }
  function la(e) {
    return (
      36 === e ||
      (e >= 40 && e <= 43) ||
      46 === e ||
      63 === e ||
      (e >= 91 && e <= 94) ||
      (e >= 123 && e <= 125)
    )
  }
  function ca(e) {
    return (e >= 65 && e <= 90) || (e >= 97 && e <= 122)
  }
  function ua(e) {
    return ca(e) || 95 === e
  }
  function pa(e) {
    return ua(e) || da(e)
  }
  function da(e) {
    return e >= 48 && e <= 57
  }
  function fa(e) {
    return (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102)
  }
  function ma(e) {
    return e >= 65 && e <= 70 ? e - 65 + 10 : e >= 97 && e <= 102 ? e - 97 + 10 : e - 48
  }
  function ga(e) {
    return e >= 48 && e <= 55
  }
  ;(oa.prototype.reset = function (e, t, s) {
    var i = -1 !== s.indexOf('u')
    ;(this.start = 0 | e),
      (this.source = t + ''),
      (this.flags = s),
      (this.switchU = i && this.parser.options.ecmaVersion >= 6),
      (this.switchN = i && this.parser.options.ecmaVersion >= 9)
  }),
    (oa.prototype.raise = function (e) {
      this.parser.raiseRecoverable(
        this.start,
        'Invalid regular expression: /' + this.source + '/: ' + e
      )
    }),
    (oa.prototype.at = function (e, t) {
      void 0 === t && (t = !1)
      var s = this.source,
        i = s.length
      if (e >= i) return -1
      var n = s.charCodeAt(e)
      if ((!t && !this.switchU) || n <= 55295 || n >= 57344 || e + 1 >= i) return n
      var r = s.charCodeAt(e + 1)
      return r >= 56320 && r <= 57343 ? (n << 10) + r - 56613888 : n
    }),
    (oa.prototype.nextIndex = function (e, t) {
      void 0 === t && (t = !1)
      var s = this.source,
        i = s.length
      if (e >= i) return i
      var n,
        r = s.charCodeAt(e)
      return (!t && !this.switchU) ||
        r <= 55295 ||
        r >= 57344 ||
        e + 1 >= i ||
        (n = s.charCodeAt(e + 1)) < 56320 ||
        n > 57343
        ? e + 1
        : e + 2
    }),
    (oa.prototype.current = function (e) {
      return void 0 === e && (e = !1), this.at(this.pos, e)
    }),
    (oa.prototype.lookahead = function (e) {
      return void 0 === e && (e = !1), this.at(this.nextIndex(this.pos, e), e)
    }),
    (oa.prototype.advance = function (e) {
      void 0 === e && (e = !1), (this.pos = this.nextIndex(this.pos, e))
    }),
    (oa.prototype.eat = function (e, t) {
      return void 0 === t && (t = !1), this.current(t) === e && (this.advance(t), !0)
    }),
    (aa.validateRegExpFlags = function (e) {
      for (var t = e.validFlags, s = e.flags, i = 0; i < s.length; i++) {
        var n = s.charAt(i)
        ;-1 === t.indexOf(n) && this.raise(e.start, 'Invalid regular expression flag'),
          s.indexOf(n, i + 1) > -1 && this.raise(e.start, 'Duplicate regular expression flag')
      }
    }),
    (aa.validateRegExpPattern = function (e) {
      this.regexp_pattern(e),
        !e.switchN &&
          this.options.ecmaVersion >= 9 &&
          e.groupNames.length > 0 &&
          ((e.switchN = !0), this.regexp_pattern(e))
    }),
    (aa.regexp_pattern = function (e) {
      ;(e.pos = 0),
        (e.lastIntValue = 0),
        (e.lastStringValue = ''),
        (e.lastAssertionIsQuantifiable = !1),
        (e.numCapturingParens = 0),
        (e.maxBackReference = 0),
        (e.groupNames.length = 0),
        (e.backReferenceNames.length = 0),
        this.regexp_disjunction(e),
        e.pos !== e.source.length &&
          (e.eat(41) && e.raise("Unmatched ')'"),
          (e.eat(93) || e.eat(125)) && e.raise('Lone quantifier brackets')),
        e.maxBackReference > e.numCapturingParens && e.raise('Invalid escape')
      for (var t = 0, s = e.backReferenceNames; t < s.length; t += 1) {
        var i = s[t]
        ;-1 === e.groupNames.indexOf(i) && e.raise('Invalid named capture referenced')
      }
    }),
    (aa.regexp_disjunction = function (e) {
      for (this.regexp_alternative(e); e.eat(124); ) this.regexp_alternative(e)
      this.regexp_eatQuantifier(e, !0) && e.raise('Nothing to repeat'),
        e.eat(123) && e.raise('Lone quantifier brackets')
    }),
    (aa.regexp_alternative = function (e) {
      for (; e.pos < e.source.length && this.regexp_eatTerm(e); );
    }),
    (aa.regexp_eatTerm = function (e) {
      return this.regexp_eatAssertion(e)
        ? (e.lastAssertionIsQuantifiable &&
            this.regexp_eatQuantifier(e) &&
            e.switchU &&
            e.raise('Invalid quantifier'),
          !0)
        : !!(e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) &&
            (this.regexp_eatQuantifier(e), !0)
    }),
    (aa.regexp_eatAssertion = function (e) {
      var t = e.pos
      if (((e.lastAssertionIsQuantifiable = !1), e.eat(94) || e.eat(36))) return !0
      if (e.eat(92)) {
        if (e.eat(66) || e.eat(98)) return !0
        e.pos = t
      }
      if (e.eat(40) && e.eat(63)) {
        var s = !1
        if ((this.options.ecmaVersion >= 9 && (s = e.eat(60)), e.eat(61) || e.eat(33)))
          return (
            this.regexp_disjunction(e),
            e.eat(41) || e.raise('Unterminated group'),
            (e.lastAssertionIsQuantifiable = !s),
            !0
          )
      }
      return (e.pos = t), !1
    }),
    (aa.regexp_eatQuantifier = function (e, t) {
      return void 0 === t && (t = !1), !!this.regexp_eatQuantifierPrefix(e, t) && (e.eat(63), !0)
    }),
    (aa.regexp_eatQuantifierPrefix = function (e, t) {
      return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t)
    }),
    (aa.regexp_eatBracedQuantifier = function (e, t) {
      var s = e.pos
      if (e.eat(123)) {
        var i = 0,
          n = -1
        if (
          this.regexp_eatDecimalDigits(e) &&
          ((i = e.lastIntValue),
          e.eat(44) && this.regexp_eatDecimalDigits(e) && (n = e.lastIntValue),
          e.eat(125))
        )
          return -1 !== n && n < i && !t && e.raise('numbers out of order in {} quantifier'), !0
        e.switchU && !t && e.raise('Incomplete quantifier'), (e.pos = s)
      }
      return !1
    }),
    (aa.regexp_eatAtom = function (e) {
      return (
        this.regexp_eatPatternCharacters(e) ||
        e.eat(46) ||
        this.regexp_eatReverseSolidusAtomEscape(e) ||
        this.regexp_eatCharacterClass(e) ||
        this.regexp_eatUncapturingGroup(e) ||
        this.regexp_eatCapturingGroup(e)
      )
    }),
    (aa.regexp_eatReverseSolidusAtomEscape = function (e) {
      var t = e.pos
      if (e.eat(92)) {
        if (this.regexp_eatAtomEscape(e)) return !0
        e.pos = t
      }
      return !1
    }),
    (aa.regexp_eatUncapturingGroup = function (e) {
      var t = e.pos
      if (e.eat(40)) {
        if (e.eat(63) && e.eat(58)) {
          if ((this.regexp_disjunction(e), e.eat(41))) return !0
          e.raise('Unterminated group')
        }
        e.pos = t
      }
      return !1
    }),
    (aa.regexp_eatCapturingGroup = function (e) {
      if (e.eat(40)) {
        if (
          (this.options.ecmaVersion >= 9
            ? this.regexp_groupSpecifier(e)
            : 63 === e.current() && e.raise('Invalid group'),
          this.regexp_disjunction(e),
          e.eat(41))
        )
          return (e.numCapturingParens += 1), !0
        e.raise('Unterminated group')
      }
      return !1
    }),
    (aa.regexp_eatExtendedAtom = function (e) {
      return (
        e.eat(46) ||
        this.regexp_eatReverseSolidusAtomEscape(e) ||
        this.regexp_eatCharacterClass(e) ||
        this.regexp_eatUncapturingGroup(e) ||
        this.regexp_eatCapturingGroup(e) ||
        this.regexp_eatInvalidBracedQuantifier(e) ||
        this.regexp_eatExtendedPatternCharacter(e)
      )
    }),
    (aa.regexp_eatInvalidBracedQuantifier = function (e) {
      return this.regexp_eatBracedQuantifier(e, !0) && e.raise('Nothing to repeat'), !1
    }),
    (aa.regexp_eatSyntaxCharacter = function (e) {
      var t = e.current()
      return !!la(t) && ((e.lastIntValue = t), e.advance(), !0)
    }),
    (aa.regexp_eatPatternCharacters = function (e) {
      for (var t = e.pos, s = 0; -1 !== (s = e.current()) && !la(s); ) e.advance()
      return e.pos !== t
    }),
    (aa.regexp_eatExtendedPatternCharacter = function (e) {
      var t = e.current()
      return !(
        -1 === t ||
        36 === t ||
        (t >= 40 && t <= 43) ||
        46 === t ||
        63 === t ||
        91 === t ||
        94 === t ||
        124 === t ||
        (e.advance(), 0)
      )
    }),
    (aa.regexp_groupSpecifier = function (e) {
      if (e.eat(63)) {
        if (this.regexp_eatGroupName(e))
          return (
            -1 !== e.groupNames.indexOf(e.lastStringValue) &&
              e.raise('Duplicate capture group name'),
            void e.groupNames.push(e.lastStringValue)
          )
        e.raise('Invalid group')
      }
    }),
    (aa.regexp_eatGroupName = function (e) {
      if (((e.lastStringValue = ''), e.eat(60))) {
        if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0
        e.raise('Invalid capture group name')
      }
      return !1
    }),
    (aa.regexp_eatRegExpIdentifierName = function (e) {
      if (((e.lastStringValue = ''), this.regexp_eatRegExpIdentifierStart(e))) {
        for (e.lastStringValue += ha(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
          e.lastStringValue += ha(e.lastIntValue)
        return !0
      }
      return !1
    }),
    (aa.regexp_eatRegExpIdentifierStart = function (e) {
      var t = e.pos,
        s = this.options.ecmaVersion >= 11,
        i = e.current(s)
      return (
        e.advance(s),
        92 === i && this.regexp_eatRegExpUnicodeEscapeSequence(e, s) && (i = e.lastIntValue),
        (function (e) {
          return sr(e, !0) || 36 === e || 95 === e
        })(i)
          ? ((e.lastIntValue = i), !0)
          : ((e.pos = t), !1)
      )
    }),
    (aa.regexp_eatRegExpIdentifierPart = function (e) {
      var t = e.pos,
        s = this.options.ecmaVersion >= 11,
        i = e.current(s)
      return (
        e.advance(s),
        92 === i && this.regexp_eatRegExpUnicodeEscapeSequence(e, s) && (i = e.lastIntValue),
        (function (e) {
          return ir(e, !0) || 36 === e || 95 === e || 8204 === e || 8205 === e
        })(i)
          ? ((e.lastIntValue = i), !0)
          : ((e.pos = t), !1)
      )
    }),
    (aa.regexp_eatAtomEscape = function (e) {
      return (
        !!(
          this.regexp_eatBackReference(e) ||
          this.regexp_eatCharacterClassEscape(e) ||
          this.regexp_eatCharacterEscape(e) ||
          (e.switchN && this.regexp_eatKGroupName(e))
        ) ||
        (e.switchU &&
          (99 === e.current() && e.raise('Invalid unicode escape'), e.raise('Invalid escape')),
        !1)
      )
    }),
    (aa.regexp_eatBackReference = function (e) {
      var t = e.pos
      if (this.regexp_eatDecimalEscape(e)) {
        var s = e.lastIntValue
        if (e.switchU) return s > e.maxBackReference && (e.maxBackReference = s), !0
        if (s <= e.numCapturingParens) return !0
        e.pos = t
      }
      return !1
    }),
    (aa.regexp_eatKGroupName = function (e) {
      if (e.eat(107)) {
        if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0
        e.raise('Invalid named reference')
      }
      return !1
    }),
    (aa.regexp_eatCharacterEscape = function (e) {
      return (
        this.regexp_eatControlEscape(e) ||
        this.regexp_eatCControlLetter(e) ||
        this.regexp_eatZero(e) ||
        this.regexp_eatHexEscapeSequence(e) ||
        this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) ||
        (!e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e)) ||
        this.regexp_eatIdentityEscape(e)
      )
    }),
    (aa.regexp_eatCControlLetter = function (e) {
      var t = e.pos
      if (e.eat(99)) {
        if (this.regexp_eatControlLetter(e)) return !0
        e.pos = t
      }
      return !1
    }),
    (aa.regexp_eatZero = function (e) {
      return 48 === e.current() && !da(e.lookahead()) && ((e.lastIntValue = 0), e.advance(), !0)
    }),
    (aa.regexp_eatControlEscape = function (e) {
      var t = e.current()
      return 116 === t
        ? ((e.lastIntValue = 9), e.advance(), !0)
        : 110 === t
          ? ((e.lastIntValue = 10), e.advance(), !0)
          : 118 === t
            ? ((e.lastIntValue = 11), e.advance(), !0)
            : 102 === t
              ? ((e.lastIntValue = 12), e.advance(), !0)
              : 114 === t && ((e.lastIntValue = 13), e.advance(), !0)
    }),
    (aa.regexp_eatControlLetter = function (e) {
      var t = e.current()
      return !!ca(t) && ((e.lastIntValue = t % 32), e.advance(), !0)
    }),
    (aa.regexp_eatRegExpUnicodeEscapeSequence = function (e, t) {
      void 0 === t && (t = !1)
      var s,
        i = e.pos,
        n = t || e.switchU
      if (e.eat(117)) {
        if (this.regexp_eatFixedHexDigits(e, 4)) {
          var r = e.lastIntValue
          if (n && r >= 55296 && r <= 56319) {
            var a = e.pos
            if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
              var o = e.lastIntValue
              if (o >= 56320 && o <= 57343)
                return (e.lastIntValue = 1024 * (r - 55296) + (o - 56320) + 65536), !0
            }
            ;(e.pos = a), (e.lastIntValue = r)
          }
          return !0
        }
        if (
          n &&
          e.eat(123) &&
          this.regexp_eatHexDigits(e) &&
          e.eat(125) &&
          (s = e.lastIntValue) >= 0 &&
          s <= 1114111
        )
          return !0
        n && e.raise('Invalid unicode escape'), (e.pos = i)
      }
      return !1
    }),
    (aa.regexp_eatIdentityEscape = function (e) {
      if (e.switchU)
        return !!this.regexp_eatSyntaxCharacter(e) || (!!e.eat(47) && ((e.lastIntValue = 47), !0))
      var t = e.current()
      return !(99 === t || (e.switchN && 107 === t) || ((e.lastIntValue = t), e.advance(), 0))
    }),
    (aa.regexp_eatDecimalEscape = function (e) {
      e.lastIntValue = 0
      var t = e.current()
      if (t >= 49 && t <= 57) {
        do {
          ;(e.lastIntValue = 10 * e.lastIntValue + (t - 48)), e.advance()
        } while ((t = e.current()) >= 48 && t <= 57)
        return !0
      }
      return !1
    }),
    (aa.regexp_eatCharacterClassEscape = function (e) {
      var t = e.current()
      if (
        (function (e) {
          return 100 === e || 68 === e || 115 === e || 83 === e || 119 === e || 87 === e
        })(t)
      )
        return (e.lastIntValue = -1), e.advance(), !0
      if (e.switchU && this.options.ecmaVersion >= 9 && (80 === t || 112 === t)) {
        if (
          ((e.lastIntValue = -1),
          e.advance(),
          e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(125))
        )
          return !0
        e.raise('Invalid property name')
      }
      return !1
    }),
    (aa.regexp_eatUnicodePropertyValueExpression = function (e) {
      var t = e.pos
      if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
        var s = e.lastStringValue
        if (this.regexp_eatUnicodePropertyValue(e)) {
          var i = e.lastStringValue
          return this.regexp_validateUnicodePropertyNameAndValue(e, s, i), !0
        }
      }
      if (((e.pos = t), this.regexp_eatLoneUnicodePropertyNameOrValue(e))) {
        var n = e.lastStringValue
        return this.regexp_validateUnicodePropertyNameOrValue(e, n), !0
      }
      return !1
    }),
    (aa.regexp_validateUnicodePropertyNameAndValue = function (e, t, s) {
      vr(e.unicodeProperties.nonBinary, t) || e.raise('Invalid property name'),
        e.unicodeProperties.nonBinary[t].test(s) || e.raise('Invalid property value')
    }),
    (aa.regexp_validateUnicodePropertyNameOrValue = function (e, t) {
      e.unicodeProperties.binary.test(t) || e.raise('Invalid property name')
    }),
    (aa.regexp_eatUnicodePropertyName = function (e) {
      var t = 0
      for (e.lastStringValue = ''; ua((t = e.current())); )
        (e.lastStringValue += ha(t)), e.advance()
      return '' !== e.lastStringValue
    }),
    (aa.regexp_eatUnicodePropertyValue = function (e) {
      var t = 0
      for (e.lastStringValue = ''; pa((t = e.current())); )
        (e.lastStringValue += ha(t)), e.advance()
      return '' !== e.lastStringValue
    }),
    (aa.regexp_eatLoneUnicodePropertyNameOrValue = function (e) {
      return this.regexp_eatUnicodePropertyValue(e)
    }),
    (aa.regexp_eatCharacterClass = function (e) {
      if (e.eat(91)) {
        if ((e.eat(94), this.regexp_classRanges(e), e.eat(93))) return !0
        e.raise('Unterminated character class')
      }
      return !1
    }),
    (aa.regexp_classRanges = function (e) {
      for (; this.regexp_eatClassAtom(e); ) {
        var t = e.lastIntValue
        if (e.eat(45) && this.regexp_eatClassAtom(e)) {
          var s = e.lastIntValue
          !e.switchU || (-1 !== t && -1 !== s) || e.raise('Invalid character class'),
            -1 !== t && -1 !== s && t > s && e.raise('Range out of order in character class')
        }
      }
    }),
    (aa.regexp_eatClassAtom = function (e) {
      var t = e.pos
      if (e.eat(92)) {
        if (this.regexp_eatClassEscape(e)) return !0
        if (e.switchU) {
          var s = e.current()
          ;(99 === s || ga(s)) && e.raise('Invalid class escape'), e.raise('Invalid escape')
        }
        e.pos = t
      }
      var i = e.current()
      return 93 !== i && ((e.lastIntValue = i), e.advance(), !0)
    }),
    (aa.regexp_eatClassEscape = function (e) {
      var t = e.pos
      if (e.eat(98)) return (e.lastIntValue = 8), !0
      if (e.switchU && e.eat(45)) return (e.lastIntValue = 45), !0
      if (!e.switchU && e.eat(99)) {
        if (this.regexp_eatClassControlLetter(e)) return !0
        e.pos = t
      }
      return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e)
    }),
    (aa.regexp_eatClassControlLetter = function (e) {
      var t = e.current()
      return !((!da(t) && 95 !== t) || ((e.lastIntValue = t % 32), e.advance(), 0))
    }),
    (aa.regexp_eatHexEscapeSequence = function (e) {
      var t = e.pos
      if (e.eat(120)) {
        if (this.regexp_eatFixedHexDigits(e, 2)) return !0
        e.switchU && e.raise('Invalid escape'), (e.pos = t)
      }
      return !1
    }),
    (aa.regexp_eatDecimalDigits = function (e) {
      var t = e.pos,
        s = 0
      for (e.lastIntValue = 0; da((s = e.current())); )
        (e.lastIntValue = 10 * e.lastIntValue + (s - 48)), e.advance()
      return e.pos !== t
    }),
    (aa.regexp_eatHexDigits = function (e) {
      var t = e.pos,
        s = 0
      for (e.lastIntValue = 0; fa((s = e.current())); )
        (e.lastIntValue = 16 * e.lastIntValue + ma(s)), e.advance()
      return e.pos !== t
    }),
    (aa.regexp_eatLegacyOctalEscapeSequence = function (e) {
      if (this.regexp_eatOctalDigit(e)) {
        var t = e.lastIntValue
        if (this.regexp_eatOctalDigit(e)) {
          var s = e.lastIntValue
          t <= 3 && this.regexp_eatOctalDigit(e)
            ? (e.lastIntValue = 64 * t + 8 * s + e.lastIntValue)
            : (e.lastIntValue = 8 * t + s)
        } else e.lastIntValue = t
        return !0
      }
      return !1
    }),
    (aa.regexp_eatOctalDigit = function (e) {
      var t = e.current()
      return ga(t) ? ((e.lastIntValue = t - 48), e.advance(), !0) : ((e.lastIntValue = 0), !1)
    }),
    (aa.regexp_eatFixedHexDigits = function (e, t) {
      var s = e.pos
      e.lastIntValue = 0
      for (var i = 0; i < t; ++i) {
        var n = e.current()
        if (!fa(n)) return (e.pos = s), !1
        ;(e.lastIntValue = 16 * e.lastIntValue + ma(n)), e.advance()
      }
      return !0
    })
  var ya = function (e) {
      ;(this.type = e.type),
        (this.value = e.value),
        (this.start = e.start),
        (this.end = e.end),
        e.options.locations && (this.loc = new _r(e, e.startLoc, e.endLoc)),
        e.options.ranges && (this.range = [e.start, e.end])
    },
    xa = Pr.prototype
  function va(e) {
    return 'function' != typeof BigInt ? null : BigInt(e.replace(/_/g, ''))
  }
  function Ea(e) {
    return e <= 65535
      ? String.fromCharCode(e)
      : ((e -= 65536), String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)))
  }
  ;(xa.next = function (e) {
    !e &&
      this.type.keyword &&
      this.containsEsc &&
      this.raiseRecoverable(this.start, 'Escape sequence in keyword ' + this.type.keyword),
      this.options.onToken && this.options.onToken(new ya(this)),
      (this.lastTokEnd = this.end),
      (this.lastTokStart = this.start),
      (this.lastTokEndLoc = this.endLoc),
      (this.lastTokStartLoc = this.startLoc),
      this.nextToken()
  }),
    (xa.getToken = function () {
      return this.next(), new ya(this)
    }),
    'undefined' != typeof Symbol &&
      (xa[Symbol.iterator] = function () {
        var e = this
        return {
          next: function () {
            var t = e.getToken()
            return { done: t.type === cr.eof, value: t }
          }
        }
      }),
    (xa.curContext = function () {
      return this.context[this.context.length - 1]
    }),
    (xa.nextToken = function () {
      var e = this.curContext()
      return (
        (e && e.preserveSpace) || this.skipSpace(),
        (this.start = this.pos),
        this.options.locations && (this.startLoc = this.curPosition()),
        this.pos >= this.input.length
          ? this.finishToken(cr.eof)
          : e.override
            ? e.override(this)
            : void this.readToken(this.fullCharCodeAtPos())
      )
    }),
    (xa.readToken = function (e) {
      return sr(e, this.options.ecmaVersion >= 6) || 92 === e
        ? this.readWord()
        : this.getTokenFromCode(e)
    }),
    (xa.fullCharCodeAtPos = function () {
      var e = this.input.charCodeAt(this.pos)
      return e <= 55295 || e >= 57344
        ? e
        : (e << 10) + this.input.charCodeAt(this.pos + 1) - 56613888
    }),
    (xa.skipBlockComment = function () {
      var e,
        t = this.options.onComment && this.curPosition(),
        s = this.pos,
        i = this.input.indexOf('*/', (this.pos += 2))
      if (
        (-1 === i && this.raise(this.pos - 2, 'Unterminated comment'),
        (this.pos = i + 2),
        this.options.locations)
      )
        for (pr.lastIndex = s; (e = pr.exec(this.input)) && e.index < this.pos; )
          ++this.curLine, (this.lineStart = e.index + e[0].length)
      this.options.onComment &&
        this.options.onComment(!0, this.input.slice(s + 2, i), s, this.pos, t, this.curPosition())
    }),
    (xa.skipLineComment = function (e) {
      for (
        var t = this.pos,
          s = this.options.onComment && this.curPosition(),
          i = this.input.charCodeAt((this.pos += e));
        this.pos < this.input.length && !dr(i);

      )
        i = this.input.charCodeAt(++this.pos)
      this.options.onComment &&
        this.options.onComment(
          !1,
          this.input.slice(t + e, this.pos),
          t,
          this.pos,
          s,
          this.curPosition()
        )
    }),
    (xa.skipSpace = function () {
      e: for (; this.pos < this.input.length; ) {
        var e = this.input.charCodeAt(this.pos)
        switch (e) {
          case 32:
          case 160:
            ++this.pos
            break
          case 13:
            10 === this.input.charCodeAt(this.pos + 1) && ++this.pos
          case 10:
          case 8232:
          case 8233:
            ++this.pos, this.options.locations && (++this.curLine, (this.lineStart = this.pos))
            break
          case 47:
            switch (this.input.charCodeAt(this.pos + 1)) {
              case 42:
                this.skipBlockComment()
                break
              case 47:
                this.skipLineComment(2)
                break
              default:
                break e
            }
            break
          default:
            if (!((e > 8 && e < 14) || (e >= 5760 && fr.test(String.fromCharCode(e))))) break e
            ++this.pos
        }
      }
    }),
    (xa.finishToken = function (e, t) {
      ;(this.end = this.pos), this.options.locations && (this.endLoc = this.curPosition())
      var s = this.type
      ;(this.type = e), (this.value = t), this.updateContext(s)
    }),
    (xa.readToken_dot = function () {
      var e = this.input.charCodeAt(this.pos + 1)
      if (e >= 48 && e <= 57) return this.readNumber(!0)
      var t = this.input.charCodeAt(this.pos + 2)
      return this.options.ecmaVersion >= 6 && 46 === e && 46 === t
        ? ((this.pos += 3), this.finishToken(cr.ellipsis))
        : (++this.pos, this.finishToken(cr.dot))
    }),
    (xa.readToken_slash = function () {
      var e = this.input.charCodeAt(this.pos + 1)
      return this.exprAllowed
        ? (++this.pos, this.readRegexp())
        : 61 === e
          ? this.finishOp(cr.assign, 2)
          : this.finishOp(cr.slash, 1)
    }),
    (xa.readToken_mult_modulo_exp = function (e) {
      var t = this.input.charCodeAt(this.pos + 1),
        s = 1,
        i = 42 === e ? cr.star : cr.modulo
      return (
        this.options.ecmaVersion >= 7 &&
          42 === e &&
          42 === t &&
          (++s, (i = cr.starstar), (t = this.input.charCodeAt(this.pos + 2))),
        61 === t ? this.finishOp(cr.assign, s + 1) : this.finishOp(i, s)
      )
    }),
    (xa.readToken_pipe_amp = function (e) {
      var t = this.input.charCodeAt(this.pos + 1)
      return t === e
        ? this.options.ecmaVersion >= 12 && 61 === this.input.charCodeAt(this.pos + 2)
          ? this.finishOp(cr.assign, 3)
          : this.finishOp(124 === e ? cr.logicalOR : cr.logicalAND, 2)
        : 61 === t
          ? this.finishOp(cr.assign, 2)
          : this.finishOp(124 === e ? cr.bitwiseOR : cr.bitwiseAND, 1)
    }),
    (xa.readToken_caret = function () {
      return 61 === this.input.charCodeAt(this.pos + 1)
        ? this.finishOp(cr.assign, 2)
        : this.finishOp(cr.bitwiseXOR, 1)
    }),
    (xa.readToken_plus_min = function (e) {
      var t = this.input.charCodeAt(this.pos + 1)
      return t === e
        ? 45 !== t ||
          this.inModule ||
          62 !== this.input.charCodeAt(this.pos + 2) ||
          (0 !== this.lastTokEnd && !ur.test(this.input.slice(this.lastTokEnd, this.pos)))
          ? this.finishOp(cr.incDec, 2)
          : (this.skipLineComment(3), this.skipSpace(), this.nextToken())
        : 61 === t
          ? this.finishOp(cr.assign, 2)
          : this.finishOp(cr.plusMin, 1)
    }),
    (xa.readToken_lt_gt = function (e) {
      var t = this.input.charCodeAt(this.pos + 1),
        s = 1
      return t === e
        ? ((s = 62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2),
          61 === this.input.charCodeAt(this.pos + s)
            ? this.finishOp(cr.assign, s + 1)
            : this.finishOp(cr.bitShift, s))
        : 33 !== t ||
            60 !== e ||
            this.inModule ||
            45 !== this.input.charCodeAt(this.pos + 2) ||
            45 !== this.input.charCodeAt(this.pos + 3)
          ? (61 === t && (s = 2), this.finishOp(cr.relational, s))
          : (this.skipLineComment(4), this.skipSpace(), this.nextToken())
    }),
    (xa.readToken_eq_excl = function (e) {
      var t = this.input.charCodeAt(this.pos + 1)
      return 61 === t
        ? this.finishOp(cr.equality, 61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2)
        : 61 === e && 62 === t && this.options.ecmaVersion >= 6
          ? ((this.pos += 2), this.finishToken(cr.arrow))
          : this.finishOp(61 === e ? cr.eq : cr.prefix, 1)
    }),
    (xa.readToken_question = function () {
      var e = this.options.ecmaVersion
      if (e >= 11) {
        var t = this.input.charCodeAt(this.pos + 1)
        if (46 === t) {
          var s = this.input.charCodeAt(this.pos + 2)
          if (s < 48 || s > 57) return this.finishOp(cr.questionDot, 2)
        }
        if (63 === t)
          return e >= 12 && 61 === this.input.charCodeAt(this.pos + 2)
            ? this.finishOp(cr.assign, 3)
            : this.finishOp(cr.coalesce, 2)
      }
      return this.finishOp(cr.question, 1)
    }),
    (xa.getTokenFromCode = function (e) {
      switch (e) {
        case 46:
          return this.readToken_dot()
        case 40:
          return ++this.pos, this.finishToken(cr.parenL)
        case 41:
          return ++this.pos, this.finishToken(cr.parenR)
        case 59:
          return ++this.pos, this.finishToken(cr.semi)
        case 44:
          return ++this.pos, this.finishToken(cr.comma)
        case 91:
          return ++this.pos, this.finishToken(cr.bracketL)
        case 93:
          return ++this.pos, this.finishToken(cr.bracketR)
        case 123:
          return ++this.pos, this.finishToken(cr.braceL)
        case 125:
          return ++this.pos, this.finishToken(cr.braceR)
        case 58:
          return ++this.pos, this.finishToken(cr.colon)
        case 96:
          if (this.options.ecmaVersion < 6) break
          return ++this.pos, this.finishToken(cr.backQuote)
        case 48:
          var t = this.input.charCodeAt(this.pos + 1)
          if (120 === t || 88 === t) return this.readRadixNumber(16)
          if (this.options.ecmaVersion >= 6) {
            if (111 === t || 79 === t) return this.readRadixNumber(8)
            if (98 === t || 66 === t) return this.readRadixNumber(2)
          }
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          return this.readNumber(!1)
        case 34:
        case 39:
          return this.readString(e)
        case 47:
          return this.readToken_slash()
        case 37:
        case 42:
          return this.readToken_mult_modulo_exp(e)
        case 124:
        case 38:
          return this.readToken_pipe_amp(e)
        case 94:
          return this.readToken_caret()
        case 43:
        case 45:
          return this.readToken_plus_min(e)
        case 60:
        case 62:
          return this.readToken_lt_gt(e)
        case 61:
        case 33:
          return this.readToken_eq_excl(e)
        case 63:
          return this.readToken_question()
        case 126:
          return this.finishOp(cr.prefix, 1)
      }
      this.raise(this.pos, "Unexpected character '" + Ea(e) + "'")
    }),
    (xa.finishOp = function (e, t) {
      var s = this.input.slice(this.pos, this.pos + t)
      return (this.pos += t), this.finishToken(e, s)
    }),
    (xa.readRegexp = function () {
      for (var e, t, s = this.pos; ; ) {
        this.pos >= this.input.length && this.raise(s, 'Unterminated regular expression')
        var i = this.input.charAt(this.pos)
        if ((ur.test(i) && this.raise(s, 'Unterminated regular expression'), e)) e = !1
        else {
          if ('[' === i) t = !0
          else if (']' === i && t) t = !1
          else if ('/' === i && !t) break
          e = '\\' === i
        }
        ++this.pos
      }
      var n = this.input.slice(s, this.pos)
      ++this.pos
      var r = this.pos,
        a = this.readWord1()
      this.containsEsc && this.unexpected(r)
      var o = this.regexpState || (this.regexpState = new oa(this))
      o.reset(s, n, a), this.validateRegExpFlags(o), this.validateRegExpPattern(o)
      var h = null
      try {
        h = new RegExp(n, a)
      } catch (e) {}
      return this.finishToken(cr.regexp, { pattern: n, flags: a, value: h })
    }),
    (xa.readInt = function (e, t, s) {
      for (
        var i = this.options.ecmaVersion >= 12 && void 0 === t,
          n = s && 48 === this.input.charCodeAt(this.pos),
          r = this.pos,
          a = 0,
          o = 0,
          h = 0,
          l = null == t ? 1 / 0 : t;
        h < l;
        ++h, ++this.pos
      ) {
        var c = this.input.charCodeAt(this.pos),
          u = void 0
        if (i && 95 === c)
          n &&
            this.raiseRecoverable(
              this.pos,
              'Numeric separator is not allowed in legacy octal numeric literals'
            ),
            95 === o &&
              this.raiseRecoverable(this.pos, 'Numeric separator must be exactly one underscore'),
            0 === h &&
              this.raiseRecoverable(
                this.pos,
                'Numeric separator is not allowed at the first of digits'
              ),
            (o = c)
        else {
          if (
            (u =
              c >= 97
                ? c - 97 + 10
                : c >= 65
                  ? c - 65 + 10
                  : c >= 48 && c <= 57
                    ? c - 48
                    : 1 / 0) >= e
          )
            break
          ;(o = c), (a = a * e + u)
        }
      }
      return (
        i &&
          95 === o &&
          this.raiseRecoverable(
            this.pos - 1,
            'Numeric separator is not allowed at the last of digits'
          ),
        this.pos === r || (null != t && this.pos - r !== t) ? null : a
      )
    }),
    (xa.readRadixNumber = function (e) {
      var t = this.pos
      this.pos += 2
      var s = this.readInt(e)
      return (
        null == s && this.raise(this.start + 2, 'Expected number in radix ' + e),
        this.options.ecmaVersion >= 11 && 110 === this.input.charCodeAt(this.pos)
          ? ((s = va(this.input.slice(t, this.pos))), ++this.pos)
          : sr(this.fullCharCodeAtPos()) &&
            this.raise(this.pos, 'Identifier directly after number'),
        this.finishToken(cr.num, s)
      )
    }),
    (xa.readNumber = function (e) {
      var t = this.pos
      e || null !== this.readInt(10, void 0, !0) || this.raise(t, 'Invalid number')
      var s = this.pos - t >= 2 && 48 === this.input.charCodeAt(t)
      s && this.strict && this.raise(t, 'Invalid number')
      var i = this.input.charCodeAt(this.pos)
      if (!s && !e && this.options.ecmaVersion >= 11 && 110 === i) {
        var n = va(this.input.slice(t, this.pos))
        return (
          ++this.pos,
          sr(this.fullCharCodeAtPos()) && this.raise(this.pos, 'Identifier directly after number'),
          this.finishToken(cr.num, n)
        )
      }
      s && /[89]/.test(this.input.slice(t, this.pos)) && (s = !1),
        46 !== i || s || (++this.pos, this.readInt(10), (i = this.input.charCodeAt(this.pos))),
        (69 !== i && 101 !== i) ||
          s ||
          ((43 !== (i = this.input.charCodeAt(++this.pos)) && 45 !== i) || ++this.pos,
          null === this.readInt(10) && this.raise(t, 'Invalid number')),
        sr(this.fullCharCodeAtPos()) && this.raise(this.pos, 'Identifier directly after number')
      var r,
        a =
          ((r = this.input.slice(t, this.pos)),
          s ? parseInt(r, 8) : parseFloat(r.replace(/_/g, '')))
      return this.finishToken(cr.num, a)
    }),
    (xa.readCodePoint = function () {
      var e
      if (123 === this.input.charCodeAt(this.pos)) {
        this.options.ecmaVersion < 6 && this.unexpected()
        var t = ++this.pos
        ;(e = this.readHexChar(this.input.indexOf('}', this.pos) - this.pos)),
          ++this.pos,
          e > 1114111 && this.invalidStringToken(t, 'Code point out of bounds')
      } else e = this.readHexChar(4)
      return e
    }),
    (xa.readString = function (e) {
      for (var t = '', s = ++this.pos; ; ) {
        this.pos >= this.input.length && this.raise(this.start, 'Unterminated string constant')
        var i = this.input.charCodeAt(this.pos)
        if (i === e) break
        92 === i
          ? ((t += this.input.slice(s, this.pos)), (t += this.readEscapedChar(!1)), (s = this.pos))
          : (dr(i, this.options.ecmaVersion >= 10) &&
              this.raise(this.start, 'Unterminated string constant'),
            ++this.pos)
      }
      return (t += this.input.slice(s, this.pos++)), this.finishToken(cr.string, t)
    })
  var ba = {}
  ;(xa.tryReadTemplateToken = function () {
    this.inTemplateElement = !0
    try {
      this.readTmplToken()
    } catch (e) {
      if (e !== ba) throw e
      this.readInvalidTemplateToken()
    }
    this.inTemplateElement = !1
  }),
    (xa.invalidStringToken = function (e, t) {
      if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw ba
      this.raise(e, t)
    }),
    (xa.readTmplToken = function () {
      for (var e = '', t = this.pos; ; ) {
        this.pos >= this.input.length && this.raise(this.start, 'Unterminated template')
        var s = this.input.charCodeAt(this.pos)
        if (96 === s || (36 === s && 123 === this.input.charCodeAt(this.pos + 1)))
          return this.pos !== this.start ||
            (this.type !== cr.template && this.type !== cr.invalidTemplate)
            ? ((e += this.input.slice(t, this.pos)), this.finishToken(cr.template, e))
            : 36 === s
              ? ((this.pos += 2), this.finishToken(cr.dollarBraceL))
              : (++this.pos, this.finishToken(cr.backQuote))
        if (92 === s)
          (e += this.input.slice(t, this.pos)), (e += this.readEscapedChar(!0)), (t = this.pos)
        else if (dr(s)) {
          switch (((e += this.input.slice(t, this.pos)), ++this.pos, s)) {
            case 13:
              10 === this.input.charCodeAt(this.pos) && ++this.pos
            case 10:
              e += '\n'
              break
            default:
              e += String.fromCharCode(s)
          }
          this.options.locations && (++this.curLine, (this.lineStart = this.pos)), (t = this.pos)
        } else ++this.pos
      }
    }),
    (xa.readInvalidTemplateToken = function () {
      for (; this.pos < this.input.length; this.pos++)
        switch (this.input[this.pos]) {
          case '\\':
            ++this.pos
            break
          case '$':
            if ('{' !== this.input[this.pos + 1]) break
          case '`':
            return this.finishToken(cr.invalidTemplate, this.input.slice(this.start, this.pos))
        }
      this.raise(this.start, 'Unterminated template')
    }),
    (xa.readEscapedChar = function (e) {
      var t = this.input.charCodeAt(++this.pos)
      switch ((++this.pos, t)) {
        case 110:
          return '\n'
        case 114:
          return '\r'
        case 120:
          return String.fromCharCode(this.readHexChar(2))
        case 117:
          return Ea(this.readCodePoint())
        case 116:
          return '\t'
        case 98:
          return '\b'
        case 118:
          return '\v'
        case 102:
          return '\f'
        case 13:
          10 === this.input.charCodeAt(this.pos) && ++this.pos
        case 10:
          return this.options.locations && ((this.lineStart = this.pos), ++this.curLine), ''
        case 56:
        case 57:
          if (
            (this.strict && this.invalidStringToken(this.pos - 1, 'Invalid escape sequence'), e)
          ) {
            var s = this.pos - 1
            return this.invalidStringToken(s, 'Invalid escape sequence in template string'), null
          }
        default:
          if (t >= 48 && t <= 55) {
            var i = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
              n = parseInt(i, 8)
            return (
              n > 255 && ((i = i.slice(0, -1)), (n = parseInt(i, 8))),
              (this.pos += i.length - 1),
              (t = this.input.charCodeAt(this.pos)),
              ('0' === i && 56 !== t && 57 !== t) ||
                (!this.strict && !e) ||
                this.invalidStringToken(
                  this.pos - 1 - i.length,
                  e ? 'Octal literal in template string' : 'Octal literal in strict mode'
                ),
              String.fromCharCode(n)
            )
          }
          return dr(t) ? '' : String.fromCharCode(t)
      }
    }),
    (xa.readHexChar = function (e) {
      var t = this.pos,
        s = this.readInt(16, e)
      return null === s && this.invalidStringToken(t, 'Bad character escape sequence'), s
    }),
    (xa.readWord1 = function () {
      this.containsEsc = !1
      for (
        var e = '', t = !0, s = this.pos, i = this.options.ecmaVersion >= 6;
        this.pos < this.input.length;

      ) {
        var n = this.fullCharCodeAtPos()
        if (ir(n, i)) this.pos += n <= 65535 ? 1 : 2
        else {
          if (92 !== n) break
          ;(this.containsEsc = !0), (e += this.input.slice(s, this.pos))
          var r = this.pos
          117 !== this.input.charCodeAt(++this.pos) &&
            this.invalidStringToken(this.pos, 'Expecting Unicode escape sequence \\uXXXX'),
            ++this.pos
          var a = this.readCodePoint()
          ;(t ? sr : ir)(a, i) || this.invalidStringToken(r, 'Invalid Unicode escape'),
            (e += Ea(a)),
            (s = this.pos)
        }
        t = !1
      }
      return e + this.input.slice(s, this.pos)
    }),
    (xa.readWord = function () {
      var e = this.readWord1(),
        t = cr.name
      return this.keywords.test(e) && (t = hr[e]), this.finishToken(t, e)
    }),
    (Pr.acorn = {
      Parser: Pr,
      version: '8.0.3',
      defaultOptions: kr,
      Position: Sr,
      SourceLocation: _r,
      getLineInfo: Ar,
      Node: Gr,
      TokenType: nr,
      tokTypes: cr,
      keywordTypes: hr,
      TokContext: Kr,
      tokContexts: Xr,
      isIdentifierChar: ir,
      isIdentifierStart: sr,
      Token: ya,
      isNewLine: dr,
      lineBreak: ur,
      lineBreakG: pr,
      nonASCIIwhitespace: fr
    })
  var Sa = Object.freeze({
    __proto__: null,
    Node: Gr,
    Parser: Pr,
    Position: Sr,
    SourceLocation: _r,
    TokContext: Kr,
    Token: ya,
    TokenType: nr,
    defaultOptions: kr,
    getLineInfo: Ar,
    isIdentifierChar: ir,
    isIdentifierStart: sr,
    isNewLine: dr,
    keywordTypes: hr,
    lineBreak: ur,
    lineBreakG: pr,
    nonASCIIwhitespace: fr,
    parse: function (e, t) {
      return Pr.parse(e, t)
    },
    parseExpressionAt: function (e, t, s) {
      return Pr.parseExpressionAt(e, t, s)
    },
    tokContexts: Xr,
    tokTypes: cr,
    tokenizer: function (e, t) {
      return Pr.tokenizer(e, t)
    },
    version: '8.0.3'
  })
  class _a extends je {
    constructor() {
      super(), this.variables.set('undefined', new St())
    }
    findVariable(e) {
      let t = this.variables.get(e)
      return t || ((t = new gt(e)), this.variables.set(e, t)), t
    }
  }
  const Aa =
      (e) =>
      (...t) => {
        throw Object.assign(
          new Error(
            `Cannot access the file system (via "fs.${e}") when using the browser build of Rollup. Make sure you supply a plugin with custom resolveId and load hooks to Rollup.`
          ),
          { code: 'NO_FS_IN_BROWSER', url: 'https://rollupjs.org/guide/en/#a-simple-example' }
        )
      },
    ka = Aa('lstatSync'),
    Ca = Aa('readdirSync'),
    wa = Aa('readFile'),
    Pa = Aa('realpathSync'),
    Ia = Aa('writeFile')
  async function Na(e, t, s, i, n, r) {
    const a = await i.hookFirst('resolveId', [e, t, { custom: r }], null, n)
    return null != a
      ? a
      : void 0 === t || Ne(e) || '.' === e[0]
        ? (function (e, t) {
            let s = Ta(e, t)
            return s || ((s = Ta(e + '.mjs', t)), s || ((s = Ta(e + '.js', t)), s))
          })(Ve(t ? Re(t) : Ve(), e), s)
        : null
  }
  function Ta(e, t) {
    try {
      const s = ka(e)
      if (!t && s.isSymbolicLink()) return Ta(Pa(e), t)
      if ((t && s.isSymbolicLink()) || s.isFile()) {
        const t = Me(e)
        if (-1 !== Ca(Re(e)).indexOf(t)) return e
      }
    } catch (e) {}
  }
  function La(e, t, { hook: s, id: i } = {}) {
    return (
      'string' == typeof e && (e = { message: e }),
      e.code && e.code !== es.PLUGIN_ERROR && (e.pluginCode = e.code),
      (e.code = es.PLUGIN_ERROR),
      (e.plugin = t),
      s && (e.hook = s),
      i && (e.id = i),
      Jt(e)
    )
  }
  const Ma = [{ active: !0, deprecated: 'resolveAssetUrl', replacement: 'resolveFileUrl' }],
    Ra = { has: () => !1, get() {}, set() {}, delete: () => !1 }
  function $a(e) {
    return e.startsWith('at position ') || e.startsWith('at output position ')
      ? Jt({
          code: 'ANONYMOUS_PLUGIN_CACHE',
          message:
            'A plugin is trying to use the Rollup cache but is not declaring a plugin name or cacheKey.'
        })
      : Jt({
          code: 'DUPLICATE_PLUGIN_NAME',
          message: `The plugin name ${e} is being used twice in the same build. Plugin names must be distinct or provide a cacheKey (please post an issue to the plugin if you are a plugin user).`
        })
  }
  class Oa {
    constructor(e, t, s, i) {
      ;(this.graph = e),
        (this.modulesById = t),
        (this.options = s),
        (this.pluginDriver = i),
        (this.implicitEntryModules = new Set()),
        (this.indexedEntryModules = []),
        (this.latestLoadModulesPromise = Promise.resolve()),
        (this.nextEntryModuleIndex = 0),
        (this.hasModuleSideEffects = s.treeshake ? s.treeshake.moduleSideEffects : () => !0)
    }
    async addAdditionalModules(e) {
      const t = this.extendLoadModulesPromise(
        Promise.all(e.map((e) => this.loadEntryModule(e, !1, void 0, null)))
      )
      return await this.awaitLoadModulesPromise(), t
    }
    async addEntryModules(e, t) {
      const s = this.nextEntryModuleIndex
      this.nextEntryModuleIndex += e.length
      const i = await this.extendLoadModulesPromise(
        Promise.all(e.map(({ id: e, importer: t }) => this.loadEntryModule(e, !0, t, null))).then(
          (i) => {
            let n = s
            for (let s = 0; s < i.length; s++) {
              const r = i[s]
              ;(r.isUserDefinedEntryPoint = r.isUserDefinedEntryPoint || t), Da(r, e[s], t)
              const a = this.indexedEntryModules.find((e) => e.module === r)
              a
                ? (a.index = Math.min(a.index, n))
                : this.indexedEntryModules.push({ module: r, index: n }),
                n++
            }
            return (
              this.indexedEntryModules.sort(({ index: e }, { index: t }) => (e > t ? 1 : -1)), i
            )
          }
        )
      )
      return (
        await this.awaitLoadModulesPromise(),
        {
          entryModules: this.indexedEntryModules.map(({ module: e }) => e),
          implicitEntryModules: [...this.implicitEntryModules],
          newEntryModules: i
        }
      )
    }
    async emitChunk({
      fileName: e,
      id: t,
      importer: s,
      name: i,
      implicitlyLoadedAfterOneOf: n,
      preserveSignature: r
    }) {
      const a = { fileName: e || null, id: t, importer: s, name: i || null },
        o = n
          ? await this.addEntryWithImplicitDependants(a, n)
          : (await this.addEntryModules([a], !1)).newEntryModules[0]
      return null != r && (o.preserveSignature = r), o
    }
    async resolveId(e, t, s, i = null) {
      return this.addDefaultsToResolvedId(
        this.getNormalizedResolvedIdWithoutDefaults(
          !this.options.external(e, t, !1) &&
            (await Na(e, t, this.options.preserveSymlinks, this.pluginDriver, i, s)),
          t,
          e
        )
      )
    }
    addDefaultsToResolvedId(e) {
      var t, s
      if (!e) return null
      const i = e.external || !1
      return {
        external: i,
        id: e.id,
        meta: e.meta || it,
        moduleSideEffects:
          null !== (t = e.moduleSideEffects) && void 0 !== t
            ? t
            : this.hasModuleSideEffects(e.id, i),
        syntheticNamedExports: null !== (s = e.syntheticNamedExports) && void 0 !== s && s
      }
    }
    addEntryWithImplicitDependants(e, t) {
      return this.extendLoadModulesPromise(
        this.loadEntryModule(e.id, !1, e.importer, null).then(async (s) => {
          if ((Da(s, e, !1), !s.isEntryPoint)) {
            this.implicitEntryModules.add(s)
            const i = await Promise.all(t.map((t) => this.loadEntryModule(t, !1, e.importer, s.id)))
            for (const e of i) s.implicitlyLoadedAfter.add(e)
            for (const e of s.implicitlyLoadedAfter) e.implicitlyLoadedBefore.add(s)
          }
          return s
        })
      )
    }
    async addModuleSource(e, t, s) {
      var i
      let n
      _i('load modules', 3)
      try {
        n =
          null !== (i = await this.pluginDriver.hookFirst('load', [e])) && void 0 !== i
            ? i
            : await wa(e)
      } catch (s) {
        Ai('load modules', 3)
        let i = 'Could not load ' + e
        throw (t && (i += ` (imported by ${Yt(t)})`), (i += ': ' + s.message), (s.message = i), s)
      }
      Ai('load modules', 3)
      const r =
          'string' == typeof n
            ? { code: n }
            : 'object' == typeof n && 'string' == typeof n.code
              ? n
              : Jt(
                  (function (e) {
                    return {
                      code: es.BAD_LOADER,
                      message: `Error loading ${Yt(e)}: plugin load hook should return a string, a { code, map } object, or nothing/null`
                    }
                  })(e)
                ),
        a = this.graph.cachedModules.get(e)
      if (a && !a.customTransformCache && a.originalCode === r.code) {
        if (a.transformFiles) for (const e of a.transformFiles) this.pluginDriver.emitFile(e)
        s.setSource(a)
      } else
        s.updateOptions(r),
          s.setSource(
            await (function (e, t, s, i) {
              const n = t.id,
                r = []
              let a = null === e.map ? null : wn(e.map)
              const o = e.code
              let l = e.ast
              const c = [],
                u = []
              let p = !1
              const d = () => (p = !0)
              let f
              const m = e.code
              return s
                .hookReduceArg0(
                  'transform',
                  [m, n],
                  function (e, s, n) {
                    let a, o
                    if ('string' == typeof s) a = s
                    else {
                      if (!s || 'object' != typeof s) return e
                      if ((t.updateOptions(s), null == s.code))
                        return (
                          (s.map || s.ast) &&
                            i(
                              ((h = n.name),
                              {
                                code: es.NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE,
                                message: `The plugin "${h}" returned a "map" or "ast" without returning a "code". This will be ignored.`
                              })
                            ),
                          e
                        )
                      ;({ code: a, map: o, ast: l } = s)
                    }
                    var h
                    return (
                      null !== o &&
                        r.push(
                          wn('string' == typeof o ? JSON.parse(o) : o) || {
                            missing: !0,
                            plugin: n.name
                          }
                        ),
                      a
                    )
                  },
                  (e, t) => {
                    return (
                      (f = t),
                      {
                        ...e,
                        cache: p
                          ? e.cache
                          : ((l = e.cache),
                            (g = d),
                            {
                              has: (e) => (g(), l.has(e)),
                              get: (e) => (g(), l.get(e)),
                              set: (e, t) => (g(), l.set(e, t)),
                              delete: (e) => (g(), l.delete(e))
                            }),
                        warn(t, s) {
                          'string' == typeof t && (t = { message: t }),
                            s && Zt(t, s, m, n),
                            (t.id = n),
                            (t.hook = 'transform'),
                            e.warn(t)
                        },
                        error: (t, s) => (
                          'string' == typeof t && (t = { message: t }),
                          s && Zt(t, s, m, n),
                          (t.id = n),
                          (t.hook = 'transform'),
                          e.error(t)
                        ),
                        emitAsset: (t, s) => (
                          u.push({ type: 'asset', name: t, source: s }), e.emitAsset(t, s)
                        ),
                        emitChunk: (t, s) => (
                          u.push({ type: 'chunk', id: t, name: s && s.name }), e.emitChunk(t, s)
                        ),
                        emitFile: (e) => (u.push(e), s.emitFile(e)),
                        addWatchFile(t) {
                          c.push(t), e.addWatchFile(t)
                        },
                        setAssetSource() {
                          return this.error({
                            code: 'INVALID_SETASSETSOURCE',
                            message:
                              'setAssetSource cannot be called in transform for caching reasons. Use emitFile with a source, or call setAssetSource in another hook.'
                          })
                        },
                        getCombinedSourcemap() {
                          const e = (function (e, t, s, i, n) {
                            return i.length
                              ? { version: 3, ...Ri(e, t, s, i, Mi(n)).traceMappings() }
                              : s
                          })(n, o, a, r, i)
                          return e
                            ? (a !== e && ((a = e), (r.length = 0)),
                              new h({ ...e, file: null, sourcesContent: e.sourcesContent }))
                            : new y(o).generateMap({ includeContent: !0, hires: !0, source: n })
                        }
                      }
                    )
                    var l, g
                  }
                )
                .catch((e) => La(e, f.name, { hook: 'transform', id: n }))
                .then(
                  (e) => (
                    p || (u.length && (t.transformFiles = u)),
                    {
                      ast: l,
                      code: e,
                      customTransformCache: p,
                      meta: t.meta,
                      originalCode: o,
                      originalSourcemap: a,
                      sourcemapChain: r,
                      transformDependencies: c
                    }
                  )
                )
            })(r, s, this.pluginDriver, this.options.onwarn)
          )
    }
    async awaitLoadModulesPromise() {
      let e
      do {
        ;(e = this.latestLoadModulesPromise), await e
      } while (e !== this.latestLoadModulesPromise)
    }
    extendLoadModulesPromise(e) {
      return (
        (this.latestLoadModulesPromise = Promise.all([e, this.latestLoadModulesPromise])),
        this.latestLoadModulesPromise.catch(() => {}),
        e
      )
    }
    async fetchDynamicDependencies(e) {
      const t = await Promise.all(
        e.dynamicImports.map(async (t) => {
          const s = await this.resolveDynamicImport(e, t.argument, e.id)
          return null === s
            ? null
            : 'string' == typeof s
              ? ((t.resolution = s), null)
              : (t.resolution = await this.fetchResolvedDependency(Yt(s.id), e.id, s))
        })
      )
      for (const s of t) s && (e.dynamicDependencies.add(s), s.dynamicImporters.push(e.id))
    }
    async fetchModule({ id: e, meta: t, moduleSideEffects: s, syntheticNamedExports: i }, n, r) {
      const a = this.modulesById.get(e)
      if (a instanceof Ni) {
        if (r) {
          ;(a.isEntryPoint = !0), this.implicitEntryModules.delete(a)
          for (const e of a.implicitlyLoadedAfter) e.implicitlyLoadedBefore.delete(a)
          a.implicitlyLoadedAfter.clear()
        }
        return a
      }
      const o = new Ni(this.graph, e, this.options, r, s, i, t)
      return (
        this.modulesById.set(e, o),
        (this.graph.watchFiles[e] = !0),
        await this.addModuleSource(e, n, o),
        await Promise.all([this.fetchStaticDependencies(o), this.fetchDynamicDependencies(o)]),
        o.linkImports(),
        o
      )
    }
    fetchResolvedDependency(e, t, s) {
      if (s.external) {
        this.modulesById.has(s.id) ||
          this.modulesById.set(s.id, new De(this.options, s.id, s.moduleSideEffects, s.meta))
        const i = this.modulesById.get(s.id)
        return i instanceof De
          ? Promise.resolve(i)
          : Jt(
              (function (e, t) {
                return {
                  code: es.INVALID_EXTERNAL_ID,
                  message: `'${e}' is imported as an external by ${Yt(t)}, but is already an existing non-external module id.`
                }
              })(e, t)
            )
      }
      return this.fetchModule(s, t, !1)
    }
    async fetchStaticDependencies(e) {
      for (const t of await Promise.all(
        Array.from(e.sources, async (t) =>
          this.fetchResolvedDependency(
            t,
            e.id,
            (e.resolvedIds[t] =
              e.resolvedIds[t] || this.handleResolveId(await this.resolveId(t, e.id, it), t, e.id))
          )
        )
      ))
        e.dependencies.add(t), t.importers.push(e.id)
    }
    getNormalizedResolvedIdWithoutDefaults(e, t, s) {
      if (e) {
        if ('object' == typeof e)
          return { ...e, external: e.external || this.options.external(e.id, t, !0) }
        const s = this.options.external(e, t, !0)
        return { external: s, id: s ? Va(e, t) : e }
      }
      const i = Va(s, t)
      return !1 === e || this.options.external(i, t, !0) ? { external: !0, id: i } : null
    }
    handleResolveId(e, t, s) {
      return null === e
        ? Te(t)
          ? Jt(
              (function (e, t) {
                return {
                  code: es.UNRESOLVED_IMPORT,
                  message: `Could not resolve '${e}' from ${Yt(t)}`
                }
              })(t, s)
            )
          : (this.options.onwarn(
              (function (e, t) {
                return {
                  code: es.UNRESOLVED_IMPORT,
                  importer: Yt(t),
                  message: `'${e}' is imported by ${Yt(t)}, but could not be resolved – treating it as an external dependency`,
                  source: e,
                  url: 'https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency'
                }
              })(t, s)
            ),
            {
              external: !0,
              id: t,
              meta: it,
              moduleSideEffects: this.hasModuleSideEffects(t, !0),
              syntheticNamedExports: !1
            })
        : (e.external &&
            e.syntheticNamedExports &&
            this.options.onwarn(
              (function (e, t) {
                return {
                  code: es.EXTERNAL_SYNTHETIC_EXPORTS,
                  importer: Yt(t),
                  message: `External '${e}' can not have 'syntheticNamedExports' enabled.`,
                  source: e
                }
              })(t, s)
            ),
          e)
    }
    async loadEntryModule(e, t, s, i) {
      const n = await Na(e, s, this.options.preserveSymlinks, this.pluginDriver, null, it)
      return null == n
        ? Jt(
            null === i
              ? (function (e) {
                  return {
                    code: es.UNRESOLVED_ENTRY,
                    message: `Could not resolve entry module (${Yt(e)}).`
                  }
                })(e)
              : (function (e, t) {
                  return {
                    code: es.MISSING_IMPLICIT_DEPENDANT,
                    message: `Module "${Yt(e)}" that should be implicitly loaded before "${Yt(t)}" could not be resolved.`
                  }
                })(e, i)
          )
        : !1 === n || ('object' == typeof n && n.external)
          ? Jt(
              null === i
                ? (function (e) {
                    return {
                      code: es.UNRESOLVED_ENTRY,
                      message: `Entry module cannot be external (${Yt(e)}).`
                    }
                  })(e)
                : (function (e, t) {
                    return {
                      code: es.MISSING_IMPLICIT_DEPENDANT,
                      message: `Module "${Yt(e)}" that should be implicitly loaded before "${Yt(t)}" cannot be external.`
                    }
                  })(e, i)
            )
          : this.fetchModule(
              this.addDefaultsToResolvedId('object' == typeof n ? n : { id: n }),
              void 0,
              t
            )
    }
    async resolveDynamicImport(e, t, s) {
      const i = await this.pluginDriver.hookFirst('resolveDynamicImport', [t, s])
      return 'string' != typeof t
        ? 'string' == typeof i
          ? i
          : i
            ? { external: !1, moduleSideEffects: !0, ...i }
            : null
        : null == i
          ? (e.resolvedIds[t] =
              e.resolvedIds[t] || this.handleResolveId(await this.resolveId(t, e.id, it), t, e.id))
          : this.handleResolveId(
              this.addDefaultsToResolvedId(this.getNormalizedResolvedIdWithoutDefaults(i, s, t)),
              t,
              s
            )
    }
  }
  function Va(e, t) {
    return Te(e) ? (t ? Ve(t, '..', e) : Ve(e)) : e
  }
  function Da(e, { fileName: t, name: s }, i) {
    null !== t
      ? e.chunkFileNames.add(t)
      : null !== s && (null === e.chunkName && (e.chunkName = s), i && e.userChunkNames.add(s))
  }
  function Ba(e, t, s, i, n, r) {
    let a = !1
    return (...o) => (
      a ||
        ((a = !0),
        hs(
          {
            message: `The "this.${t}" plugin context function used by plugin ${i} is deprecated. The "this.${s}" plugin context function should be used instead.`,
            plugin: i
          },
          n,
          r
        )),
      e(...o)
    )
  }
  const Fa = Object.keys({
    buildEnd: 1,
    buildStart: 1,
    load: 1,
    options: 1,
    resolveDynamicImport: 1,
    resolveId: 1,
    transform: 1,
    watchChange: 1
  })
  function Wa(e, t) {
    return Jt({
      code: 'INVALID_PLUGIN_HOOK',
      message: `Error running plugin hook ${e} for ${t}, expected a function hook.`
    })
  }
  class Ua {
    constructor(e, t, s, i, n) {
      if (
        ((this.graph = e),
        (this.options = t),
        (function (e, t) {
          for (const { active: s, deprecated: i, replacement: n } of Ma)
            for (const r of e)
              i in r &&
                hs(
                  {
                    message: `The "${i}" hook used by plugin ${r.name} is deprecated. The "${n}" hook should be used instead.`,
                    plugin: r.name
                  },
                  s,
                  t
                )
        })(s, t),
        (this.pluginCache = i),
        (this.fileEmitter = new Fn(e, t, n && n.fileEmitter)),
        (this.emitFile = this.fileEmitter.emitFile),
        (this.getFileName = this.fileEmitter.getFileName),
        (this.finaliseAssets = this.fileEmitter.assertAssetsFinalized),
        (this.setOutputBundle = this.fileEmitter.setOutputBundle),
        (this.plugins = s.concat(n ? n.plugins : [])),
        (this.pluginContexts = this.plugins.map(
          (function (e, t, s, i) {
            const n = new Set()
            return (r, a) => {
              let o,
                h = !0
              if (
                ('string' != typeof r.cacheKey &&
                  (r.name.startsWith('at position ') ||
                  r.name.startsWith('at output position ') ||
                  n.has(r.name)
                    ? (h = !1)
                    : n.add(r.name)),
                e)
              )
                if (h) {
                  const t = r.cacheKey || r.name
                  ;(c = e[t] || (e[t] = Object.create(null))),
                    (o = {
                      has(e) {
                        const t = c[e]
                        return !!t && ((t[0] = 0), !0)
                      },
                      get(e) {
                        const t = c[e]
                        if (t) return (t[0] = 0), t[1]
                      },
                      set(e, t) {
                        c[e] = [0, t]
                      },
                      delete: (e) => delete c[e]
                    })
                } else
                  (l = r.name),
                    (o = {
                      has: () => $a(l),
                      get: () => $a(l),
                      set: () => $a(l),
                      delete: () => $a(l)
                    })
              else o = Ra
              var l, c
              return {
                addWatchFile(e) {
                  if (t.phase >= On.GENERATE)
                    return this.error({
                      code: es.INVALID_ROLLUP_PHASE,
                      message: 'Cannot call addWatchFile after the build has finished.'
                    })
                  t.watchFiles[e] = !0
                },
                cache: o,
                emitAsset: Ba(
                  (e, t) => i.emitFile({ type: 'asset', name: e, source: t }),
                  'emitAsset',
                  'emitFile',
                  r.name,
                  !0,
                  s
                ),
                emitChunk: Ba(
                  (e, t) => i.emitFile({ type: 'chunk', id: e, name: t && t.name }),
                  'emitChunk',
                  'emitFile',
                  r.name,
                  !0,
                  s
                ),
                emitFile: i.emitFile,
                error: (e) => La(e, r.name),
                getAssetFileName: Ba(
                  i.getFileName,
                  'getAssetFileName',
                  'getFileName',
                  r.name,
                  !0,
                  s
                ),
                getChunkFileName: Ba(
                  i.getFileName,
                  'getChunkFileName',
                  'getFileName',
                  r.name,
                  !0,
                  s
                ),
                getFileName: i.getFileName,
                getModuleIds: () => t.modulesById.keys(),
                getModuleInfo: t.getModuleInfo,
                isExternal: Ba(
                  (e, t, i = !1) => s.external(e, t, i),
                  'isExternal',
                  'resolve',
                  r.name,
                  !0,
                  s
                ),
                meta: { rollupVersion: '2.29.0', watchMode: t.watchMode },
                get moduleIds() {
                  const e = t.modulesById.keys()
                  return (function* () {
                    hs(
                      {
                        message: `Accessing "this.moduleIds" on the plugin context by plugin ${r.name} is deprecated. The "this.getModuleIds" plugin context function should be used instead.`,
                        plugin: r.name
                      },
                      !1,
                      s
                    ),
                      yield* e
                  })()
                },
                parse: t.contextParse,
                resolve: (e, s, { custom: i, skipSelf: n } = st) =>
                  t.moduleLoader.resolveId(e, s, i, n ? a : null),
                resolveId: Ba(
                  (e, s) => t.moduleLoader.resolveId(e, s, st).then((e) => e && e.id),
                  'resolveId',
                  'resolve',
                  r.name,
                  !0,
                  s
                ),
                setAssetSource: i.setAssetSource,
                warn(e) {
                  'string' == typeof e && (e = { message: e }),
                    e.code && (e.pluginCode = e.code),
                    (e.code = 'PLUGIN_WARNING'),
                    (e.plugin = r.name),
                    s.onwarn(e)
                }
              }
            }
          })(i, e, t, this.fileEmitter)
        )),
        n)
      )
        for (const e of s)
          for (const s of Fa)
            s in e &&
              t.onwarn(
                ((r = e.name),
                (a = s),
                {
                  code: es.INPUT_HOOK_IN_OUTPUT_PLUGIN,
                  message: `The "${a}" hook used by the output plugin ${r} is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin.`
                })
              )
      var r, a
    }
    createOutputPluginDriver(e) {
      return new Ua(this.graph, this.options, e, this.pluginCache, this)
    }
    hookFirst(e, t, s, i) {
      let n = Promise.resolve(void 0)
      for (let r = 0; r < this.plugins.length; r++)
        i !== r && (n = n.then((i) => (null != i ? i : this.runHook(e, t, r, !1, s))))
      return n
    }
    hookFirstSync(e, t, s) {
      for (let i = 0; i < this.plugins.length; i++) {
        const n = this.runHookSync(e, t, i, s)
        if (null != n) return n
      }
      return null
    }
    hookParallel(e, t, s) {
      const i = []
      for (let n = 0; n < this.plugins.length; n++) {
        const r = this.runHook(e, t, n, !1, s)
        r && i.push(r)
      }
      return Promise.all(i).then(() => {})
    }
    hookReduceArg0(e, [t, ...s], i, n) {
      let r = Promise.resolve(t)
      for (let t = 0; t < this.plugins.length; t++)
        r = r.then((r) => {
          const a = [r, ...s],
            o = this.runHook(e, a, t, !1, n)
          return o ? o.then((e) => i.call(this.pluginContexts[t], r, e, this.plugins[t])) : r
        })
      return r
    }
    hookReduceArg0Sync(e, [t, ...s], i, n) {
      for (let r = 0; r < this.plugins.length; r++) {
        const a = [t, ...s],
          o = this.runHookSync(e, a, r, n)
        t = i.call(this.pluginContexts[r], t, o, this.plugins[r])
      }
      return t
    }
    hookReduceValue(e, t, s, i, n) {
      let r = Promise.resolve(t)
      for (let t = 0; t < this.plugins.length; t++)
        r = r.then((r) => {
          const a = this.runHook(e, s, t, !0, n)
          return a ? a.then((e) => i.call(this.pluginContexts[t], r, e, this.plugins[t])) : r
        })
      return r
    }
    hookReduceValueSync(e, t, s, i, n) {
      let r = t
      for (let t = 0; t < this.plugins.length; t++) {
        const a = this.runHookSync(e, s, t, n)
        r = i.call(this.pluginContexts[t], r, a, this.plugins[t])
      }
      return r
    }
    hookSeq(e, t, s) {
      let i = Promise.resolve()
      for (let n = 0; n < this.plugins.length; n++) i = i.then(() => this.runHook(e, t, n, !1, s))
      return i
    }
    hookSeqSync(e, t, s) {
      for (let i = 0; i < this.plugins.length; i++) this.runHookSync(e, t, i, s)
    }
    runHook(e, t, s, i, n) {
      const r = this.plugins[s],
        a = r[e]
      if (!a) return
      let o = this.pluginContexts[s]
      return (
        n && (o = n(o, r)),
        Promise.resolve()
          .then(() => ('function' != typeof a ? (i ? a : Wa(e, r.name)) : a.apply(o, t)))
          .catch((t) => La(t, r.name, { hook: e }))
      )
    }
    runHookSync(e, t, s, i) {
      const n = this.plugins[s],
        r = n[e]
      if (!r) return
      let a = this.pluginContexts[s]
      i && (a = i(a, n))
      try {
        return 'function' != typeof r ? Wa(e, n.name) : r.apply(a, t)
      } catch (t) {
        return La(t, n.name, { hook: e })
      }
    }
  }
  class ja {
    constructor(e, t) {
      var s, i
      if (
        ((this.options = e),
        (this.entryModules = []),
        (this.modulesById = new Map()),
        (this.needsTreeshakingPass = !1),
        (this.phase = On.LOAD_AND_PARSE),
        (this.watchFiles = Object.create(null)),
        (this.watchMode = !1),
        (this.externalModules = []),
        (this.implicitEntryModules = []),
        (this.modules = []),
        (this.getModuleInfo = (e) => {
          const t = this.modulesById.get(e)
          return t
            ? {
                get dynamicallyImportedIds() {
                  if (t instanceof Ni) {
                    const e = []
                    for (const { resolution: s } of t.dynamicImports)
                      (s instanceof Ni || s instanceof De) && e.push(s.id)
                    return e
                  }
                  return nt
                },
                get dynamicImporters() {
                  return t.dynamicImporters.sort()
                },
                hasModuleSideEffects: t.moduleSideEffects,
                id: t.id,
                get implicitlyLoadedAfterOneOf() {
                  return t instanceof Ni ? Array.from(t.implicitlyLoadedAfter, ri) : nt
                },
                get implicitlyLoadedBefore() {
                  return t instanceof Ni ? Array.from(t.implicitlyLoadedBefore, ri) : []
                },
                get importedIds() {
                  return t instanceof Ni ? Array.from(t.sources, (e) => t.resolvedIds[e].id) : nt
                },
                get importers() {
                  return t.importers.sort()
                },
                isEntry: t instanceof Ni && t.isEntryPoint,
                isExternal: t instanceof De,
                meta: t.meta
              }
            : null
        }),
        (this.deoptimizationTracker = new U()),
        (this.cachedModules = new Map()),
        !1 !== e.cache)
      ) {
        if (null === (s = e.cache) || void 0 === s ? void 0 : s.modules)
          for (const t of e.cache.modules) this.cachedModules.set(t.id, t)
        this.pluginCache =
          (null === (i = e.cache) || void 0 === i ? void 0 : i.plugins) || Object.create(null)
        for (const e in this.pluginCache) {
          const t = this.pluginCache[e]
          for (const e of Object.keys(t)) t[e][0]++
        }
      }
      if (
        ((this.contextParse = (e, t = {}) =>
          this.acornParser.parse(e, { ...this.options.acorn, ...t })),
        t)
      ) {
        this.watchMode = !0
        const e = (e) => this.pluginDriver.hookSeqSync('watchChange', [e])
        t.on('change', e),
          t.once('restart', () => {
            t.removeListener('change', e)
          })
      }
      ;(this.pluginDriver = new Ua(this, e, e.plugins, this.pluginCache)),
        (this.scope = new _a()),
        (this.acornParser = Pr.extend(...e.acornInjectPlugins)),
        (this.moduleLoader = new Oa(this, this.modulesById, this.options, this.pluginDriver))
    }
    async build() {
      _i('generate module graph', 2),
        await this.generateModuleGraph(),
        Ai('generate module graph', 2),
        _i('sort modules', 2),
        (this.phase = On.ANALYSE),
        this.sortModules(),
        Ai('sort modules', 2),
        _i('mark included statements', 2),
        this.includeStatements(),
        Ai('mark included statements', 2),
        (this.phase = On.GENERATE)
    }
    getCache() {
      for (const e in this.pluginCache) {
        const t = this.pluginCache[e]
        let s = !0
        for (const e of Object.keys(t))
          t[e][0] >= this.options.experimentalCacheExpiry ? delete t[e] : (s = !1)
        s && delete this.pluginCache[e]
      }
      return { modules: this.modules.map((e) => e.toJSON()), plugins: this.pluginCache }
    }
    async generateModuleGraph() {
      var e
      if (
        (({ entryModules: this.entryModules, implicitEntryModules: this.implicitEntryModules } =
          await this.moduleLoader.addEntryModules(
            ((e = this.options.input),
            Array.isArray(e)
              ? e.map((e) => ({
                  fileName: null,
                  id: e,
                  implicitlyLoadedAfter: [],
                  importer: void 0,
                  name: null
                }))
              : Object.keys(e).map((t) => ({
                  fileName: null,
                  id: e[t],
                  implicitlyLoadedAfter: [],
                  importer: void 0,
                  name: t
                }))),
            !0
          )),
        0 === this.entryModules.length)
      )
        throw new Error('You must supply options.input to rollup')
      for (const e of this.modulesById.values())
        e instanceof Ni ? this.modules.push(e) : this.externalModules.push(e)
    }
    includeStatements() {
      for (const e of [...this.entryModules, ...this.implicitEntryModules])
        !1 !== e.preserveSignature ? e.includeAllExports(!1) : Be(e)
      if (this.options.treeshake) {
        let e = 1
        do {
          _i('treeshaking pass ' + e, 3), (this.needsTreeshakingPass = !1)
          for (const e of this.modules)
            e.isExecuted &&
              ('no-treeshake' === e.moduleSideEffects ? e.includeAllInBundle() : e.include())
          Ai('treeshaking pass ' + e++, 3)
        } while (this.needsTreeshakingPass)
      } else for (const e of this.modules) e.includeAllInBundle()
      for (const e of this.externalModules) e.warnUnusedImports()
      for (const e of this.implicitEntryModules)
        for (const t of e.implicitlyLoadedAfter) t.isEntryPoint || t.isIncluded() || Jt(is(t))
    }
    sortModules() {
      const { orderedModules: e, cyclePaths: t } = (function (e) {
        let t = 0
        const s = [],
          i = new Set(),
          n = new Set(),
          r = new Map(),
          a = [],
          o = (e) => {
            if (e instanceof Ni) {
              for (const t of e.dependencies)
                r.has(t) ? i.has(t) || s.push(kn(t, e, r)) : (r.set(t, e), o(t))
              for (const t of e.implicitlyLoadedBefore) n.add(t)
              for (const { resolution: t } of e.dynamicImports) t instanceof Ni && n.add(t)
              a.push(e)
            }
            ;(e.execIndex = t++), i.add(e)
          }
        for (const t of e) r.has(t) || (r.set(t, null), o(t))
        for (const e of n) r.has(e) || (r.set(e, null), o(e))
        return { orderedModules: a, cyclePaths: s }
      })(this.entryModules)
      for (const e of t)
        this.options.onwarn({
          code: 'CIRCULAR_DEPENDENCY',
          cycle: e,
          importer: e[0],
          message: 'Circular dependency: ' + e.join(' -> ')
        })
      this.modules = e
      for (const e of this.modules) e.bindReferences()
      this.warnForMissingExports()
    }
    warnForMissingExports() {
      for (const e of this.modules)
        for (const t of Object.keys(e.importDescriptions)) {
          const s = e.importDescriptions[t]
          '*' === s.name ||
            s.module.getVariableForExportName(s.name) ||
            e.warn(
              {
                code: 'NON_EXISTENT_EXPORT',
                message: `Non-existent export '${s.name}' is imported from ${Yt(s.module.id)}`,
                name: s.name,
                source: s.module.id
              },
              s.start
            )
        }
    }
  }
  function za(e) {
    return Array.isArray(e) ? e.filter(Boolean) : e ? [e] : []
  }
  var Ga = (function (e) {
    if (e.__esModule) return e
    var t = Object.defineProperty({}, '__esModule', { value: !0 })
    return (
      Object.keys(e).forEach(function (s) {
        var i = Object.getOwnPropertyDescriptor(e, s)
        Object.defineProperty(
          t,
          s,
          i.get
            ? i
            : {
                enumerable: !0,
                get: function () {
                  return e[s]
                }
              }
        )
      }),
      t
    )
  })(Sa)
  const Ha = Object.getPrototypeOf || ((e) => e.__proto__)
  var qa = function (e) {
      if (e.prototype.parsePrivateName) return e
      const t = ((e) => {
        if (e.acorn) return e.acorn
        const t = Ga
        if (
          0 != t.version.indexOf('6.') &&
          0 == t.version.indexOf('6.0.') &&
          0 != t.version.indexOf('7.')
        )
          throw new Error(
            'acorn-private-class-elements requires acorn@^6.1.0 or acorn@7.0.0, not ' + t.version
          )
        for (let s = e; s && s !== t.Parser; s = Ha(s))
          if (s !== t.Parser)
            throw new Error(
              'acorn-private-class-elements does not support mixing different acorn copies'
            )
        return t
      })(e)
      return (
        ((e = class extends e {
          _branch() {
            return (
              (this.__branch =
                this.__branch || new e({ ecmaVersion: this.options.ecmaVersion }, this.input)),
              (this.__branch.end = this.end),
              (this.__branch.pos = this.pos),
              (this.__branch.type = this.type),
              (this.__branch.value = this.value),
              (this.__branch.containsEsc = this.containsEsc),
              this.__branch
            )
          }
          parsePrivateClassElementName(e) {
            ;(e.computed = !1),
              (e.key = this.parsePrivateName()),
              'constructor' == e.key.name &&
                this.raise(e.key.start, 'Classes may not have a private element named constructor')
            const t = { get: 'set', set: 'get' }[e.kind],
              s = this._privateBoundNames
            return (
              Object.prototype.hasOwnProperty.call(s, e.key.name) &&
                s[e.key.name] !== t &&
                this.raise(e.start, 'Duplicate private element'),
              (s[e.key.name] = e.kind || !0),
              delete this._unresolvedPrivateNames[e.key.name],
              e.key
            )
          }
          parsePrivateName() {
            const e = this.startNode()
            return (
              (e.name = this.value),
              this.next(),
              this.finishNode(e, 'PrivateName'),
              'never' == this.options.allowReserved && this.checkUnreserved(e),
              e
            )
          }
          getTokenFromCode(e) {
            if (35 === e) {
              ++this.pos
              const e = this.readWord1()
              return this.finishToken(this.privateNameToken, e)
            }
            return super.getTokenFromCode(e)
          }
          parseClass(e, t) {
            const s = this._outerPrivateBoundNames
            ;(this._outerPrivateBoundNames = this._privateBoundNames),
              (this._privateBoundNames = Object.create(this._privateBoundNames || null))
            const i = this._outerUnresolvedPrivateNames
            ;(this._outerUnresolvedPrivateNames = this._unresolvedPrivateNames),
              (this._unresolvedPrivateNames = Object.create(null))
            const n = super.parseClass(e, t),
              r = this._unresolvedPrivateNames
            if (
              ((this._privateBoundNames = this._outerPrivateBoundNames),
              (this._outerPrivateBoundNames = s),
              (this._unresolvedPrivateNames = this._outerUnresolvedPrivateNames),
              (this._outerUnresolvedPrivateNames = i),
              this._unresolvedPrivateNames)
            )
              Object.assign(this._unresolvedPrivateNames, r)
            else {
              const e = Object.keys(r)
              e.length &&
                (e.sort((e, t) => r[e] - r[t]),
                this.raise(r[e[0]], 'Usage of undeclared private name'))
            }
            return n
          }
          parseClassSuper(e) {
            const t = this._privateBoundNames
            this._privateBoundNames = this._outerPrivateBoundNames
            const s = this._unresolvedPrivateNames
            this._unresolvedPrivateNames = this._outerUnresolvedPrivateNames
            const i = super.parseClassSuper(e)
            return (this._privateBoundNames = t), (this._unresolvedPrivateNames = s), i
          }
          parseSubscript(e, s, i, n, r, a) {
            const o = this.options.ecmaVersion >= 11 && t.tokTypes.questionDot,
              h = this._branch()
            if (
              !(h.eat(t.tokTypes.dot) || (o && h.eat(t.tokTypes.questionDot))) ||
              h.type != this.privateNameToken
            )
              return super.parseSubscript.apply(this, arguments)
            let l = !1
            this.eat(t.tokTypes.dot) || (this.expect(t.tokTypes.questionDot), (l = !0))
            let c = this.startNodeAt(s, i)
            return (
              (c.object = e),
              (c.computed = !1),
              o && (c.optional = l),
              this.type == this.privateNameToken
                ? ('Super' == e.type &&
                    this.raise(this.start, 'Cannot access private element on super'),
                  (c.property = this.parsePrivateName()),
                  (this._privateBoundNames && this._privateBoundNames[c.property.name]) ||
                    (this._unresolvedPrivateNames ||
                      this.raise(c.property.start, 'Usage of undeclared private name'),
                    (this._unresolvedPrivateNames[c.property.name] = c.property.start)))
                : (c.property = this.parseIdent(!0)),
              this.finishNode(c, 'MemberExpression')
            )
          }
          parseMaybeUnary(e, t) {
            const s = super.parseMaybeUnary(e, t)
            return (
              'delete' == s.operator &&
                'MemberExpression' == s.argument.type &&
                'PrivateName' == s.argument.property.type &&
                this.raise(s.start, 'Private elements may not be deleted'),
              s
            )
          }
        }).prototype.privateNameToken = new t.TokenType('privateName')),
        e
      )
    },
    Ka = function (e) {
      const t = (e.acorn || Ga).tokTypes
      return (
        (e = qa(e)),
        class extends e {
          _maybeParseFieldValue(e) {
            if (this.eat(t.eq)) {
              const s = this._inFieldValue
              ;(this._inFieldValue = !0),
                this.type === t.name &&
                'await' === this.value &&
                (this.inAsync || this.options.allowAwaitOutsideFunction)
                  ? (e.value = this.parseAwait())
                  : (e.value = this.parseExpression()),
                (this._inFieldValue = s)
            } else e.value = null
          }
          parseClassElement(e) {
            if (
              this.options.ecmaVersion >= 8 &&
              (this.type == t.name ||
                this.type.keyword ||
                this.type == this.privateNameToken ||
                this.type == t.bracketL ||
                this.type == t.string ||
                this.type == t.num)
            ) {
              const e = this._branch()
              if (e.type == t.bracketL) {
                let s = 0
                do {
                  e.eat(t.bracketL) ? ++s : e.eat(t.bracketR) ? --s : e.next()
                } while (s > 0)
              } else e.next(!0)
              let s = e.type == t.eq || e.type == t.semi
              if ((!s && e.canInsertSemicolon() && (s = e.type != t.parenL), s)) {
                const e = this.startNode()
                return (
                  this.type == this.privateNameToken
                    ? this.parsePrivateClassElementName(e)
                    : this.parsePropertyName(e),
                  (('Identifier' === e.key.type && 'constructor' === e.key.name) ||
                    ('Literal' === e.key.type && 'constructor' === e.key.value)) &&
                    this.raise(e.key.start, 'Classes may not have a field called constructor'),
                  this.enterScope(67),
                  this._maybeParseFieldValue(e),
                  this.exitScope(),
                  this.finishNode(e, 'FieldDefinition'),
                  this.semicolon(),
                  e
                )
              }
            }
            return super.parseClassElement.apply(this, arguments)
          }
          parseIdent(e, t) {
            const s = super.parseIdent(e, t)
            return (
              this._inFieldValue &&
                'arguments' == s.name &&
                this.raise(s.start, 'A class field initializer may not contain arguments'),
              s
            )
          }
        }
      )
    },
    Xa = function (e) {
      const t = e.acorn || Ga
      return (t.version.startsWith('6.') &&
        !t.version.startsWith('6.0.') &&
        !t.version.startsWith('6.1.')) ||
        t.version.startsWith('7.')
        ? (function (e, t) {
            return class extends t {
              readInt(e, t) {
                if (null != t) return super.readInt(e, t)
                let s = this.pos,
                  i = 0,
                  n = !1
                for (;;) {
                  let t,
                    s = this.input.charCodeAt(this.pos)
                  if (s >= 97) t = s - 97 + 10
                  else {
                    if (95 == s) {
                      n || this.raise(this.pos, 'Invalid numeric separator'), ++this.pos, (n = !1)
                      continue
                    }
                    t = s >= 65 ? s - 65 + 10 : s >= 48 && s <= 57 ? s - 48 : 1 / 0
                  }
                  if (t >= e) break
                  ++this.pos, (i = i * e + t), (n = !0)
                }
                return this.pos === s
                  ? null
                  : (n || this.raise(this.pos - 1, 'Invalid numeric separator'), i)
              }
              readNumber(t) {
                let s = this.pos
                t || null !== this.readInt(10) || this.raise(s, 'Invalid number')
                let i = this.pos - s >= 2 && 48 === this.input.charCodeAt(s),
                  n = !1
                i && this.strict && this.raise(s, 'Invalid number')
                let r = this.input.charCodeAt(this.pos)
                if (!i && !t && this.options.ecmaVersion >= 11 && 110 === r) {
                  let t = this.getNumberInput(s, this.pos),
                    i = 'undefined' != typeof BigInt ? BigInt(t) : null
                  return (
                    ++this.pos,
                    e.isIdentifierStart(this.fullCharCodeAtPos()) &&
                      this.raise(this.pos, 'Identifier directly after number'),
                    this.finishToken(e.tokTypes.num, i)
                  )
                }
                i && /[89]/.test(this.input.slice(s, this.pos)) && ((i = !1), (n = !0)),
                  46 !== r ||
                    i ||
                    (++this.pos, this.readInt(10), (r = this.input.charCodeAt(this.pos))),
                  (69 !== r && 101 !== r) ||
                    i ||
                    ((r = this.input.charCodeAt(++this.pos)),
                    (43 !== r && 45 !== r) || ++this.pos,
                    null === this.readInt(10) && this.raise(s, 'Invalid number')),
                  e.isIdentifierStart(this.fullCharCodeAtPos()) &&
                    this.raise(this.pos, 'Identifier directly after number')
                let a = this.getNumberInput(s, this.pos)
                ;(i || n) && a.length < this.pos - s && this.raise(s, 'Invalid number')
                let o = i ? parseInt(a, 8) : parseFloat(a)
                return this.finishToken(e.tokTypes.num, o)
              }
              parseLiteral(e) {
                const t = super.parseLiteral(e)
                return t.bigint && (t.bigint = t.bigint.replace(/_/g, '')), t
              }
              readRadixNumber(t) {
                let s = this.pos
                this.pos += 2
                let i = this.readInt(t)
                if (
                  (null == i && this.raise(this.start + 2, 'Expected number in radix ' + t),
                  this.options.ecmaVersion >= 11 && 110 === this.input.charCodeAt(this.pos))
                ) {
                  let e = this.getNumberInput(s, this.pos)
                  ;(i = 'undefined' != typeof BigInt ? BigInt(e) : null), ++this.pos
                } else
                  e.isIdentifierStart(this.fullCharCodeAtPos()) &&
                    this.raise(this.pos, 'Identifier directly after number')
                return this.finishToken(e.tokTypes.num, i)
              }
              getNumberInput(e, t) {
                return this.input.slice(e, t).replace(/_/g, '')
              }
            }
          })(t, e)
        : (function (e, t) {
            return class extends t {
              readInt(e, t) {
                if (null != t) return super.readInt(e, t)
                let s = this.pos,
                  i = 0,
                  n = !1
                for (;;) {
                  let t,
                    s = this.input.charCodeAt(this.pos)
                  if (s >= 97) t = s - 97 + 10
                  else {
                    if (95 == s) {
                      n || this.raise(this.pos, 'Invalid numeric separator'), ++this.pos, (n = !1)
                      continue
                    }
                    t = s >= 65 ? s - 65 + 10 : s >= 48 && s <= 57 ? s - 48 : 1 / 0
                  }
                  if (t >= e) break
                  ++this.pos, (i = i * e + t), (n = !0)
                }
                return this.pos === s
                  ? null
                  : (n || this.raise(this.pos - 1, 'Invalid numeric separator'), i)
              }
              readNumber(e) {
                const t = super.readNumber(e)
                let s = this.end - this.start >= 2 && 48 === this.input.charCodeAt(this.start)
                const i = this.getNumberInput(this.start, this.end)
                return (
                  i.length < this.end - this.start &&
                    (s && this.raise(this.start, 'Invalid number'), (this.value = parseFloat(i))),
                  t
                )
              }
              getNumberInput(e, t) {
                return this.input.slice(e, t).replace(/_/g, '')
              }
            }
          })(0, e)
    },
    Ya = function (e) {
      const t = qa(e),
        s = (e.acorn || Ga).tokTypes
      return class extends t {
        _maybeParseFieldValue(e) {
          if (this.eat(s.eq)) {
            const t = this._inStaticFieldScope
            ;(this._inStaticFieldScope = this.currentThisScope()),
              (e.value = this.parseExpression()),
              (this._inStaticFieldScope = t)
          } else e.value = null
        }
        parseClassElement(e) {
          if (this.options.ecmaVersion < 8 || !this.isContextual('static'))
            return super.parseClassElement.apply(this, arguments)
          const t = this._branch()
          if (
            (t.next(),
            -1 == [s.name, s.bracketL, s.string, s.num, this.privateNameToken].indexOf(t.type) &&
              !t.type.keyword)
          )
            return super.parseClassElement.apply(this, arguments)
          if (t.type == s.bracketL) {
            let e = 0
            do {
              t.eat(s.bracketL) ? ++e : t.eat(s.bracketR) ? --e : t.next()
            } while (e > 0)
          } else t.next()
          if (t.type != s.eq && !t.canInsertSemicolon() && t.type != s.semi)
            return super.parseClassElement.apply(this, arguments)
          const i = this.startNode()
          return (
            (i.static = this.eatContextual('static')),
            this.type == this.privateNameToken
              ? this.parsePrivateClassElementName(i)
              : this.parsePropertyName(i),
            (('Identifier' === i.key.type && 'constructor' === i.key.name) ||
              ('Literal' === i.key.type && !i.computed && 'constructor' === i.key.value)) &&
              this.raise(i.key.start, 'Classes may not have a field called constructor'),
            'prototype' !== (i.key.name || i.key.value) ||
              i.computed ||
              this.raise(i.key.start, 'Classes may not have a static property named prototype'),
            this.enterScope(67),
            this._maybeParseFieldValue(i),
            this.exitScope(),
            this.finishNode(i, 'FieldDefinition'),
            this.semicolon(),
            i
          )
        }
        parsePropertyName(e) {
          e.static && this.type == this.privateNameToken
            ? this.parsePrivateClassElementName(e)
            : super.parsePropertyName(e)
        }
        parseIdent(e, t) {
          const s = super.parseIdent(e, t)
          return (
            this._inStaticFieldScope &&
              this.currentThisScope() === this._inStaticFieldScope &&
              'arguments' == s.name &&
              this.raise(s.start, 'A static class field initializer may not contain arguments'),
            s
          )
        }
      }
    }
  const Qa = (e) => console.warn(e.message || e)
  function Ja(e, t, s, i, n = /$./) {
    const r = new Set(t),
      a = Object.keys(e).filter((e) => !(r.has(e) || n.test(e)))
    a.length > 0 &&
      i({
        code: 'UNKNOWN_OPTION',
        message: `Unknown ${s}: ${a.join(', ')}. Allowed options: ${[...r].sort().join(', ')}`
      })
  }
  const Za = (e) => ({
      allowAwaitOutsideFunction: !0,
      ecmaVersion: 'latest',
      preserveParens: !1,
      sourceType: 'module',
      ...e.acorn
    }),
    eo = (e) => [Ka, Ya, Xa, ...za(e.acornInjectPlugins)],
    to = (e) => {
      var t
      return (null === (t = e.cache) || void 0 === t ? void 0 : t.cache) || e.cache
    },
    so = (e) => {
      if (!0 === e) return () => !0
      if ('function' == typeof e) return (t, ...s) => (!t.startsWith('\0') && e(t, ...s)) || !1
      if (e) {
        const t = new Set(),
          s = []
        for (const i of za(e)) i instanceof RegExp ? s.push(i) : t.add(i)
        return (e, ...i) => t.has(e) || s.some((t) => t.test(e))
      }
      return () => !1
    },
    io = (e, t, s) => {
      const i = e.inlineDynamicImports
      return (
        i &&
          ls(
            'The "inlineDynamicImports" option is deprecated. Use the "output.inlineDynamicImports" option instead.',
            !1,
            t,
            s
          ),
        i
      )
    },
    no = (e) => {
      const t = e.input
      return null == t ? [] : 'string' == typeof t ? [t] : t
    },
    ro = (e, t, s) => {
      const i = e.manualChunks
      return (
        i &&
          ls(
            'The "manualChunks" option is deprecated. Use the "output.manualChunks" option instead.',
            !1,
            t,
            s
          ),
        i
      )
    },
    ao = (e, t) => {
      const s = e.moduleContext
      if ('function' == typeof s)
        return (e) => {
          var i
          return null !== (i = s(e)) && void 0 !== i ? i : t
        }
      if (s) {
        const e = Object.create(null)
        for (const t of Object.keys(s)) e[Ve(t)] = s[t]
        return (s) => e[s] || t
      }
      return () => t
    },
    oo = (e, t) => {
      const s = e.preserveEntrySignatures
      return null == s && t.add('preserveEntrySignatures'), null != s ? s : 'strict'
    },
    ho = (e, t, s) => {
      const i = e.preserveModules
      return (
        i &&
          ls(
            'The "preserveModules" option is deprecated. Use the "output.preserveModules" option instead.',
            !1,
            t,
            s
          ),
        i
      )
    },
    lo = (e, t, s) => {
      const i = e.treeshake
      return (
        !1 !== i &&
        (i && !0 !== i
          ? (void 0 !== i.pureExternalModules &&
              ls(
                'The "treeshake.pureExternalModules" option is deprecated. The "treeshake.moduleSideEffects" option should be used instead. "treeshake.pureExternalModules: true" is equivalent to "treeshake.moduleSideEffects: \'no-external\'"',
                !0,
                t,
                s
              ),
            {
              annotations: !1 !== i.annotations,
              moduleSideEffects: co(i.moduleSideEffects, i.pureExternalModules, t),
              propertyReadSideEffects: !1 !== i.propertyReadSideEffects,
              tryCatchDeoptimization: !1 !== i.tryCatchDeoptimization,
              unknownGlobalSideEffects: !1 !== i.unknownGlobalSideEffects
            })
          : {
              annotations: !0,
              moduleSideEffects: () => !0,
              propertyReadSideEffects: !0,
              tryCatchDeoptimization: !0,
              unknownGlobalSideEffects: !0
            })
      )
    },
    co = (e, t, s) => {
      if ('boolean' == typeof e) return () => e
      if ('no-external' === e) return (e, t) => !t
      if ('function' == typeof e) return (t, s) => !!t.startsWith('\0') || !1 !== e(t, s)
      if (Array.isArray(e)) {
        const t = new Set(e)
        return (e) => t.has(e)
      }
      e &&
        s(
          ('treeshake.moduleSideEffects',
          'please use one of false, "no-external", a function or an array',
          {
            code: es.INVALID_OPTION,
            message:
              'Invalid value for option "treeshake.moduleSideEffects" - please use one of false, "no-external", a function or an array.'
          })
        )
      const i = so(t)
      return (e, t) => !(t && i(e))
    },
    uo = (e) => {
      const t = e.preserveModulesRoot
      if (null != t) return Ve(t)
    },
    po = (e) => ({ define: 'define', ...e.amd }),
    fo = (e, t) => {
      const s = e[t]
      return 'function' == typeof s ? s : () => s || ''
    },
    mo = (e, t) => {
      const s = e.dir
      return 'string' == typeof s && 'string' == typeof t
        ? Jt({
            code: 'INVALID_OPTION',
            message:
              'You must set either "output.file" for a single-file build or "output.dir" when generating multiple chunks.'
          })
        : s
    },
    go = (e, t) => {
      const s = e.dynamicImportFunction
      return (
        s &&
          hs(
            'The "output.dynamicImportFunction" option is deprecated. Use the "renderDynamicImport" plugin hook instead.',
            !1,
            t
          ),
        s
      )
    },
    yo = (e, t) => {
      const s = e.entryFileNames
      return null == s && t.add('entryFileNames'), null != s ? s : '[name].js'
    }
  function xo(e, t) {
    const s = e.exports
    if (null == s) t.add('exports')
    else if (!['default', 'named', 'none', 'auto'].includes(s))
      return Jt(
        ((i = s),
        {
          code: es.INVALID_EXPORT_OPTION,
          message: `"output.exports" must be "default", "named", "none", "auto", or left unspecified (defaults to "auto"), received "${i}"`,
          url: 'https://rollupjs.org/guide/en/#outputexports'
        })
      )
    var i
    return s || 'auto'
  }
  const vo = (e, t) => {
      if (t) return ''
      const s = e.indent
      return !1 === s ? '' : null == s || s
    },
    Eo = new Set(['auto', 'esModule', 'default', 'defaultOnly', !0, !1]),
    bo = (e, t) => {
      const s = e.interop,
        i = new Set(),
        n = (e) => {
          if (!i.has(e)) {
            if ((i.add(e), !Eo.has(e)))
              return Jt({
                code: 'INVALID_OPTION',
                message: `The value ${JSON.stringify(e)} is not supported for "output.interop". Use one of ${Array.from(Eo.values(), (e) => JSON.stringify(e)).join(', ')} instead.`,
                url: 'https://rollupjs.org/guide/en/#outputinterop'
              })
            'boolean' == typeof e &&
              hs(
                {
                  message: `The boolean value "${e}" for the "output.interop" option is deprecated. Use ${e ? '"auto"' : '"esModule", "default" or "defaultOnly"'} instead.`,
                  url: 'https://rollupjs.org/guide/en/#outputinterop'
                },
                !1,
                t
              )
          }
          return e
        }
      if ('function' == typeof s) {
        const e = Object.create(null)
        let t = null
        return (i) => (null === i ? t || n((t = s(i))) : i in e ? e[i] : n((e[i] = s(i))))
      }
      return void 0 === s ? () => !0 : () => n(s)
    },
    So = (e, t, s, i) => {
      const n = e.manualChunks || i.manualChunks
      if (n) {
        if (t)
          return Jt({
            code: 'INVALID_OPTION',
            message:
              'The "output.manualChunks" option is not supported for "output.inlineDynamicImports".'
          })
        if (s)
          return Jt({
            code: 'INVALID_OPTION',
            message:
              'The "output.manualChunks" option is not supported for "output.preserveModules".'
          })
      }
      return n || {}
    },
    _o = (e, t, s) => {
      var i
      return null !== (i = e.minifyInternalExports) && void 0 !== i
        ? i
        : s || 'es' === t || 'system' === t
    }
  function Ao(e) {
    return (async function (e, t) {
      const { options: s, unsetOptions: i } = await (async function (e, t) {
        if (!e) throw new Error('You must supply an options object to rollup')
        const s = za(e.plugins),
          { options: i, unsetOptions: n } = (function (e) {
            var t, s
            const i = new Set(),
              n = null !== (t = e.context) && void 0 !== t ? t : 'undefined',
              r = ((e) =>
                e.onwarn
                  ? (t) => {
                      ;(t.toString = () => {
                        let e = ''
                        return (
                          t.plugin && (e += `(${t.plugin} plugin) `),
                          t.loc && (e += `${Yt(t.loc.file)} (${t.loc.line}:${t.loc.column}) `),
                          (e += t.message),
                          e
                        )
                      }),
                        e.onwarn(t, Qa)
                    }
                  : Qa)(e),
              a = e.strictDeprecations || !1,
              o = {
                acorn: Za(e),
                acornInjectPlugins: eo(e),
                cache: to(e),
                context: n,
                experimentalCacheExpiry:
                  null !== (s = e.experimentalCacheExpiry) && void 0 !== s ? s : 10,
                external: so(e.external),
                inlineDynamicImports: io(e, r, a),
                input: no(e),
                manualChunks: ro(e, r, a),
                moduleContext: ao(e, n),
                onwarn: r,
                perf: e.perf || !1,
                plugins: za(e.plugins),
                preserveEntrySignatures: oo(e, i),
                preserveModules: ho(e, r, a),
                preserveSymlinks: e.preserveSymlinks || !1,
                shimMissingExports: e.shimMissingExports || !1,
                strictDeprecations: a,
                treeshake: lo(e, r, a)
              }
            return (
              Ja(e, [...Object.keys(o), 'watch'], 'input options', o.onwarn, /^(output)$/),
              { options: o, unsetOptions: i }
            )
          })(
            await s.reduce(
              async (e, t) =>
                (t.options &&
                  t.options.call({ meta: { rollupVersion: '2.29.0', watchMode: !1 } }, await e)) ||
                e,
              Promise.resolve(e)
            )
          )
        return ko(i.plugins, 'at position '), { options: i, unsetOptions: n }
      })(e)
      !(function (e) {
        e.perf
          ? ((xi = {}),
            'undefined' != typeof process && 'function' == typeof process.hrtime
              ? ((mi = process.hrtime.bind(process)),
                (gi = (e) => {
                  return 1e3 * (t = process.hrtime(e))[0] + t[1] / 1e6
                  var t
                }))
              : 'undefined' != typeof performance &&
                'function' == typeof performance.now &&
                ((mi = () => [performance.now(), 0]), (gi = (e) => performance.now() - e[0])),
            'undefined' != typeof process &&
              'function' == typeof process.memoryUsage &&
              (yi = () => process.memoryUsage().heapUsed),
            (_i = Ei),
            (Ai = bi),
            (e.plugins = e.plugins.map(Ci)))
          : ((_i = fi), (Ai = fi))
      })(s)
      const n = new ja(s, null),
        r = !1 !== e.cache
      delete s.cache, delete e.cache, _i('BUILD', 1)
      try {
        await n.pluginDriver.hookParallel('buildStart', [s]), await n.build()
      } catch (e) {
        const t = Object.keys(n.watchFiles)
        throw (
          (t.length > 0 && (e.watchFiles = t),
          await n.pluginDriver.hookParallel('buildEnd', [e]),
          e)
        )
      }
      await n.pluginDriver.hookParallel('buildEnd', []), Ai('BUILD', 1)
      const a = {
        cache: r ? n.getCache() : void 0,
        generate: async (e) => Co(!1, s, i, e, n),
        watchFiles: Object.keys(n.watchFiles),
        write: async (e) => Co(!0, s, i, e, n)
      }
      return s.perf && (a.getTimings = Si), a
    })(e)
  }
  function ko(e, t) {
    for (let s = 0; s < e.length; s++) {
      const i = e[s]
      i.name || (i.name = `${t}${s + 1}`)
    }
  }
  async function Co(e, t, s, i, n) {
    const {
        options: r,
        outputPluginDriver: a,
        unsetOptions: o
      } = (function (e, t, s, i) {
        if (!e) throw new Error('You must supply an options object')
        const n = za(e.plugins)
        ko(n, 'at output position ')
        const r = t.createOutputPluginDriver(n)
        return { ...wo(s, i, e, r), outputPluginDriver: r }
      })(i, n.pluginDriver, t, s),
      h = new Un(r, o, t, a, n),
      l = await h.generate(e)
    if (e) {
      if (!r.dir && !r.file)
        return Jt({
          code: 'MISSING_OPTION',
          message: 'You must specify "output.file" or "output.dir" for the build.'
        })
      await Promise.all(
        Object.keys(l).map((e) =>
          (function (e, t) {
            const s = Ve(t.dir || Re(t.file), e.fileName)
            let i, n
            if ('asset' === e.type) n = e.source
            else if (((n = e.code), t.sourcemap && e.map)) {
              let r
              'inline' === t.sourcemap
                ? (r = e.map.toUrl())
                : ((r = Me(e.fileName) + '.map'), (i = Ia(s + '.map', e.map.toString()))),
                'hidden' !== t.sourcemap && (n += `//# sourceMappingURL=${r}\n`)
            }
            return Promise.all([Ia(s, n), i])
          })(l[e], r)
        )
      ),
        await a.hookParallel('writeBundle', [r, l])
    }
    return (
      (c = l),
      {
        output: Object.keys(c)
          .map((e) => c[e])
          .filter((e) => Object.keys(e).length > 0)
          .sort((e, t) => {
            const s = Io(e),
              i = Io(t)
            return s === i ? 0 : s < i ? -1 : 1
          })
      }
    )
    var c
  }
  function wo(e, t, s, i) {
    return (function (e, t, s) {
      var i, n, r, a, o, h, l
      const c = new Set(s),
        u = e.compact || !1,
        p = ((e) => {
          const t = e.format
          switch (t) {
            case void 0:
            case 'es':
            case 'esm':
            case 'module':
              return 'es'
            case 'cjs':
            case 'commonjs':
              return 'cjs'
            case 'system':
            case 'systemjs':
              return 'system'
            case 'amd':
            case 'iife':
            case 'umd':
              return t
            default:
              return Jt({
                message:
                  'You must specify "output.format", which can be one of "amd", "cjs", "system", "es", "iife" or "umd".',
                url: 'https://rollupjs.org/guide/en/#outputformat'
              })
          }
        })(e),
        d = ((e, t) => {
          var s
          const i =
              (null !== (s = e.inlineDynamicImports) && void 0 !== s
                ? s
                : t.inlineDynamicImports) || !1,
            { input: n } = t
          return i && (Array.isArray(n) ? n : Object.keys(n)).length > 1
            ? Jt({
                code: 'INVALID_OPTION',
                message: 'Multiple inputs are not supported for "output.inlineDynamicImports".'
              })
            : i
        })(e, t),
        f = ((e, t, s) => {
          var i
          const n = (null !== (i = e.preserveModules) && void 0 !== i ? i : s.preserveModules) || !1
          if (n) {
            if (t)
              return Jt({
                code: 'INVALID_OPTION',
                message:
                  'The "output.inlineDynamicImports" option is not supported for "output.preserveModules".'
              })
            if (!1 === s.preserveEntrySignatures)
              return Jt({
                code: 'INVALID_OPTION',
                message:
                  'Setting "preserveEntrySignatures" to "false" is not supported for "output.preserveModules".'
              })
          }
          return n
        })(e, d, t),
        m = ((e, t, s) => {
          const i = e.file
          if ('string' == typeof i) {
            if (t)
              return Jt({
                code: 'INVALID_OPTION',
                message:
                  'You must set "output.dir" instead of "output.file" when using the "output.preserveModules" option.'
              })
            if (!Array.isArray(s.input))
              return Jt({
                code: 'INVALID_OPTION',
                message:
                  'You must set "output.dir" instead of "output.file" when providing named inputs.'
              })
          }
          return i
        })(e, f, t),
        g = {
          amd: po(e),
          assetFileNames:
            null !== (i = e.assetFileNames) && void 0 !== i ? i : 'assets/[name]-[hash][extname]',
          banner: fo(e, 'banner'),
          chunkFileNames: null !== (n = e.chunkFileNames) && void 0 !== n ? n : '[name]-[hash].js',
          compact: u,
          dir: mo(e, m),
          dynamicImportFunction: go(e, t),
          entryFileNames: yo(e, c),
          esModule: null === (r = e.esModule) || void 0 === r || r,
          exports: xo(e, c),
          extend: e.extend || !1,
          externalLiveBindings: null === (a = e.externalLiveBindings) || void 0 === a || a,
          file: m,
          footer: fo(e, 'footer'),
          format: p,
          freeze: null === (o = e.freeze) || void 0 === o || o,
          globals: e.globals || {},
          hoistTransitiveImports: null === (h = e.hoistTransitiveImports) || void 0 === h || h,
          indent: vo(e, u),
          inlineDynamicImports: d,
          interop: bo(e, t),
          intro: fo(e, 'intro'),
          manualChunks: So(e, d, f, t),
          minifyInternalExports: _o(e, p, u),
          name: e.name,
          namespaceToStringTag: e.namespaceToStringTag || !1,
          noConflict: e.noConflict || !1,
          outro: fo(e, 'outro'),
          paths: e.paths || {},
          plugins: za(e.plugins),
          preferConst: e.preferConst || !1,
          preserveModules: f,
          preserveModulesRoot: uo(e),
          sourcemap: e.sourcemap || !1,
          sourcemapExcludeSources: e.sourcemapExcludeSources || !1,
          sourcemapFile: e.sourcemapFile,
          sourcemapPathTransform: e.sourcemapPathTransform,
          strict: null === (l = e.strict) || void 0 === l || l,
          systemNullSetters: e.systemNullSetters || !1
        }
      return Ja(e, Object.keys(g), 'output options', t.onwarn), { options: g, unsetOptions: c }
    })(
      i.hookReduceArg0Sync(
        'outputOptions',
        [s.output || s],
        (e, t) => t || e,
        (e) => {
          const t = () =>
            e.error({
              code: es.CANNOT_EMIT_FROM_OPTIONS_HOOK,
              message:
                'Cannot emit files or set asset sources in the "outputOptions" hook, use the "renderStart" hook instead.'
            })
          return { ...e, emitFile: t, setAssetSource: t }
        }
      ),
      e,
      t
    )
  }
  var Po
  function Io(e) {
    return 'asset' === e.type ? Po.ASSET : e.isEntry ? Po.ENTRY_CHUNK : Po.SECONDARY_CHUNK
  }
  !(function (e) {
    ;(e[(e.ENTRY_CHUNK = 0)] = 'ENTRY_CHUNK'),
      (e[(e.SECONDARY_CHUNK = 1)] = 'SECONDARY_CHUNK'),
      (e[(e.ASSET = 2)] = 'ASSET')
  })(Po || (Po = {}))
  var No = {
      3: 'abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile',
      5: 'class enum extends super const export import',
      6: 'enum',
      strict: 'implements interface let package private protected public static yield',
      strictBind: 'eval arguments'
    },
    To =
      'break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this',
    Lo = {
      5: To,
      '5module': To + ' export import',
      6: To + ' const class extends export import super'
    },
    Mo = /^in(stanceof)?$/,
    Ro =
      'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿯ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-Ᶎꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭧꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ',
    $o =
      '‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿',
    Oo = new RegExp('[' + Ro + ']'),
    Vo = new RegExp('[' + Ro + $o + ']')
  Ro = $o = null
  var Do = [
      0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6,
      37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7,
      153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55,
      7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17,
      111, 72, 56, 50, 14, 50, 14, 35, 477, 28, 11, 0, 9, 21, 155, 22, 13, 52, 76, 44, 33, 24, 27,
      35, 30, 0, 12, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14,
      2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 0,
      33, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63,
      32, 0, 161, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8,
      2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 270,
      921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32,
      20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 754, 9486, 286, 50, 2,
      18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11,
      2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2,
      30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43,
      1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0,
      2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2,
      3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 15, 7472,
      3104, 541
    ],
    Bo = [
      509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 525,
      10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49,
      13, 9, 3, 4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3,
      6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9,
      9, 84, 14, 5, 9, 243, 14, 166, 9, 232, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47,
      15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2,
      4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 19723, 1, 5319, 4, 4,
      5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2,
      16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 792487, 239
    ]
  function Fo(e, t) {
    for (var s = 65536, i = 0; i < t.length; i += 2) {
      if ((s += t[i]) > e) return !1
      if ((s += t[i + 1]) >= e) return !0
    }
  }
  function Wo(e, t) {
    return e < 65
      ? 36 === e
      : e < 91 ||
          (e < 97
            ? 95 === e
            : e < 123 ||
              (e <= 65535 ? e >= 170 && Oo.test(String.fromCharCode(e)) : !1 !== t && Fo(e, Do)))
  }
  function Uo(e, t) {
    return e < 48
      ? 36 === e
      : e < 58 ||
          (!(e < 65) &&
            (e < 91 ||
              (e < 97
                ? 95 === e
                : e < 123 ||
                  (e <= 65535
                    ? e >= 170 && Vo.test(String.fromCharCode(e))
                    : !1 !== t && (Fo(e, Do) || Fo(e, Bo))))))
  }
  var jo = function (e, t) {
    void 0 === t && (t = {}),
      (this.label = e),
      (this.keyword = t.keyword),
      (this.beforeExpr = !!t.beforeExpr),
      (this.startsExpr = !!t.startsExpr),
      (this.isLoop = !!t.isLoop),
      (this.isAssign = !!t.isAssign),
      (this.prefix = !!t.prefix),
      (this.postfix = !!t.postfix),
      (this.binop = t.binop || null),
      (this.updateContext = null)
  }
  function zo(e, t) {
    return new jo(e, { beforeExpr: !0, binop: t })
  }
  var Go = { beforeExpr: !0 },
    Ho = { startsExpr: !0 },
    qo = {}
  function Ko(e, t) {
    return void 0 === t && (t = {}), (t.keyword = e), (qo[e] = new jo(e, t))
  }
  var Xo = {
      num: new jo('num', Ho),
      regexp: new jo('regexp', Ho),
      string: new jo('string', Ho),
      name: new jo('name', Ho),
      eof: new jo('eof'),
      bracketL: new jo('[', { beforeExpr: !0, startsExpr: !0 }),
      bracketR: new jo(']'),
      braceL: new jo('{', { beforeExpr: !0, startsExpr: !0 }),
      braceR: new jo('}'),
      parenL: new jo('(', { beforeExpr: !0, startsExpr: !0 }),
      parenR: new jo(')'),
      comma: new jo(',', Go),
      semi: new jo(';', Go),
      colon: new jo(':', Go),
      dot: new jo('.'),
      question: new jo('?', Go),
      arrow: new jo('=>', Go),
      template: new jo('template'),
      invalidTemplate: new jo('invalidTemplate'),
      ellipsis: new jo('...', Go),
      backQuote: new jo('`', Ho),
      dollarBraceL: new jo('${', { beforeExpr: !0, startsExpr: !0 }),
      eq: new jo('=', { beforeExpr: !0, isAssign: !0 }),
      assign: new jo('_=', { beforeExpr: !0, isAssign: !0 }),
      incDec: new jo('++/--', { prefix: !0, postfix: !0, startsExpr: !0 }),
      prefix: new jo('!/~', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      logicalOR: zo('||', 1),
      logicalAND: zo('&&', 2),
      bitwiseOR: zo('|', 3),
      bitwiseXOR: zo('^', 4),
      bitwiseAND: zo('&', 5),
      equality: zo('==/!=/===/!==', 6),
      relational: zo('</>/<=/>=', 7),
      bitShift: zo('<</>>/>>>', 8),
      plusMin: new jo('+/-', { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
      modulo: zo('%', 10),
      star: zo('*', 10),
      slash: zo('/', 10),
      starstar: new jo('**', { beforeExpr: !0 }),
      _break: Ko('break'),
      _case: Ko('case', Go),
      _catch: Ko('catch'),
      _continue: Ko('continue'),
      _debugger: Ko('debugger'),
      _default: Ko('default', Go),
      _do: Ko('do', { isLoop: !0, beforeExpr: !0 }),
      _else: Ko('else', Go),
      _finally: Ko('finally'),
      _for: Ko('for', { isLoop: !0 }),
      _function: Ko('function', Ho),
      _if: Ko('if'),
      _return: Ko('return', Go),
      _switch: Ko('switch'),
      _throw: Ko('throw', Go),
      _try: Ko('try'),
      _var: Ko('var'),
      _const: Ko('const'),
      _while: Ko('while', { isLoop: !0 }),
      _with: Ko('with'),
      _new: Ko('new', { beforeExpr: !0, startsExpr: !0 }),
      _this: Ko('this', Ho),
      _super: Ko('super', Ho),
      _class: Ko('class', Ho),
      _extends: Ko('extends', Go),
      _export: Ko('export'),
      _import: Ko('import', Ho),
      _null: Ko('null', Ho),
      _true: Ko('true', Ho),
      _false: Ko('false', Ho),
      _in: Ko('in', { beforeExpr: !0, binop: 7 }),
      _instanceof: Ko('instanceof', { beforeExpr: !0, binop: 7 }),
      _typeof: Ko('typeof', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _void: Ko('void', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      _delete: Ko('delete', { beforeExpr: !0, prefix: !0, startsExpr: !0 })
    },
    Yo = /\r\n?|\n|\u2028|\u2029/,
    Qo = new RegExp(Yo.source, 'g')
  function Jo(e, t) {
    return 10 === e || 13 === e || (!t && (8232 === e || 8233 === e))
  }
  var Zo = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
    eh = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
    th = Object.prototype,
    sh = th.hasOwnProperty,
    ih = th.toString
  function nh(e, t) {
    return sh.call(e, t)
  }
  var rh =
    Array.isArray ||
    function (e) {
      return '[object Array]' === ih.call(e)
    }
  function ah(e) {
    return new RegExp('^(?:' + e.replace(/ /g, '|') + ')$')
  }
  var oh = function (e, t) {
    ;(this.line = e), (this.column = t)
  }
  oh.prototype.offset = function (e) {
    return new oh(this.line, this.column + e)
  }
  var hh = function (e, t, s) {
    ;(this.start = t), (this.end = s), null !== e.sourceFile && (this.source = e.sourceFile)
  }
  function lh(e, t) {
    for (var s = 1, i = 0; ; ) {
      Qo.lastIndex = i
      var n = Qo.exec(e)
      if (!(n && n.index < t)) return new oh(s, t - i)
      ++s, (i = n.index + n[0].length)
    }
  }
  var ch = {
    ecmaVersion: 10,
    sourceType: 'script',
    onInsertedSemicolon: null,
    onTrailingComma: null,
    allowReserved: null,
    allowReturnOutsideFunction: !1,
    allowImportExportEverywhere: !1,
    allowAwaitOutsideFunction: !1,
    allowHashBang: !1,
    locations: !1,
    onToken: null,
    onComment: null,
    ranges: !1,
    program: null,
    sourceFile: null,
    directSourceFile: null,
    preserveParens: !1
  }
  function uh(e) {
    var t = {}
    for (var s in ch) t[s] = e && nh(e, s) ? e[s] : ch[s]
    if (
      (t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009),
      null == t.allowReserved && (t.allowReserved = t.ecmaVersion < 5),
      rh(t.onToken))
    ) {
      var i = t.onToken
      t.onToken = function (e) {
        return i.push(e)
      }
    }
    return (
      rh(t.onComment) &&
        (t.onComment = (function (e, t) {
          return function (s, i, n, r, a, o) {
            var h = { type: s ? 'Block' : 'Line', value: i, start: n, end: r }
            e.locations && (h.loc = new hh(this, a, o)), e.ranges && (h.range = [n, r]), t.push(h)
          }
        })(t, t.onComment)),
      t
    )
  }
  function ph(e, t) {
    return 2 | (e ? 4 : 0) | (t ? 8 : 0)
  }
  var dh = function (e, t, s) {
      ;(this.options = e = uh(e)),
        (this.sourceFile = e.sourceFile),
        (this.keywords = ah(Lo[e.ecmaVersion >= 6 ? 6 : 'module' === e.sourceType ? '5module' : 5]))
      var i = ''
      if (!0 !== e.allowReserved) {
        for (var n = e.ecmaVersion; !(i = No[n]); n--);
        'module' === e.sourceType && (i += ' await')
      }
      this.reservedWords = ah(i)
      var r = (i ? i + ' ' : '') + No.strict
      ;(this.reservedWordsStrict = ah(r)),
        (this.reservedWordsStrictBind = ah(r + ' ' + No.strictBind)),
        (this.input = String(t)),
        (this.containsEsc = !1),
        s
          ? ((this.pos = s),
            (this.lineStart = this.input.lastIndexOf('\n', s - 1) + 1),
            (this.curLine = this.input.slice(0, this.lineStart).split(Yo).length))
          : ((this.pos = this.lineStart = 0), (this.curLine = 1)),
        (this.type = Xo.eof),
        (this.value = null),
        (this.start = this.end = this.pos),
        (this.startLoc = this.endLoc = this.curPosition()),
        (this.lastTokEndLoc = this.lastTokStartLoc = null),
        (this.lastTokStart = this.lastTokEnd = this.pos),
        (this.context = this.initialContext()),
        (this.exprAllowed = !0),
        (this.inModule = 'module' === e.sourceType),
        (this.strict = this.inModule || this.strictDirective(this.pos)),
        (this.potentialArrowAt = -1),
        (this.yieldPos = this.awaitPos = this.awaitIdentPos = 0),
        (this.labels = []),
        (this.undefinedExports = {}),
        0 === this.pos &&
          e.allowHashBang &&
          '#!' === this.input.slice(0, 2) &&
          this.skipLineComment(2),
        (this.scopeStack = []),
        this.enterScope(1),
        (this.regexpState = null)
    },
    fh = {
      inFunction: { configurable: !0 },
      inGenerator: { configurable: !0 },
      inAsync: { configurable: !0 },
      allowSuper: { configurable: !0 },
      allowDirectSuper: { configurable: !0 },
      treatFunctionsAsVar: { configurable: !0 }
    }
  ;(dh.prototype.parse = function () {
    var e = this.options.program || this.startNode()
    return this.nextToken(), this.parseTopLevel(e)
  }),
    (fh.inFunction.get = function () {
      return (2 & this.currentVarScope().flags) > 0
    }),
    (fh.inGenerator.get = function () {
      return (8 & this.currentVarScope().flags) > 0
    }),
    (fh.inAsync.get = function () {
      return (4 & this.currentVarScope().flags) > 0
    }),
    (fh.allowSuper.get = function () {
      return (64 & this.currentThisScope().flags) > 0
    }),
    (fh.allowDirectSuper.get = function () {
      return (128 & this.currentThisScope().flags) > 0
    }),
    (fh.treatFunctionsAsVar.get = function () {
      return this.treatFunctionsAsVarInScope(this.currentScope())
    }),
    (dh.prototype.inNonArrowFunction = function () {
      return (2 & this.currentThisScope().flags) > 0
    }),
    (dh.extend = function () {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t]
      for (var s = this, i = 0; i < e.length; i++) s = e[i](s)
      return s
    }),
    (dh.parse = function (e, t) {
      return new this(t, e).parse()
    }),
    (dh.parseExpressionAt = function (e, t, s) {
      var i = new this(s, e, t)
      return i.nextToken(), i.parseExpression()
    }),
    (dh.tokenizer = function (e, t) {
      return new this(t, e)
    }),
    Object.defineProperties(dh.prototype, fh)
  var mh = dh.prototype,
    gh = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/
  function yh() {
    this.shorthandAssign =
      this.trailingComma =
      this.parenthesizedAssign =
      this.parenthesizedBind =
      this.doubleProto =
        -1
  }
  ;(mh.strictDirective = function (e) {
    for (;;) {
      ;(eh.lastIndex = e), (e += eh.exec(this.input)[0].length)
      var t = gh.exec(this.input.slice(e))
      if (!t) return !1
      if ('use strict' === (t[1] || t[2])) return !0
      ;(e += t[0].length),
        (eh.lastIndex = e),
        (e += eh.exec(this.input)[0].length),
        ';' === this.input[e] && e++
    }
  }),
    (mh.eat = function (e) {
      return this.type === e && (this.next(), !0)
    }),
    (mh.isContextual = function (e) {
      return this.type === Xo.name && this.value === e && !this.containsEsc
    }),
    (mh.eatContextual = function (e) {
      return !!this.isContextual(e) && (this.next(), !0)
    }),
    (mh.expectContextual = function (e) {
      this.eatContextual(e) || this.unexpected()
    }),
    (mh.canInsertSemicolon = function () {
      return (
        this.type === Xo.eof ||
        this.type === Xo.braceR ||
        Yo.test(this.input.slice(this.lastTokEnd, this.start))
      )
    }),
    (mh.insertSemicolon = function () {
      if (this.canInsertSemicolon())
        return (
          this.options.onInsertedSemicolon &&
            this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc),
          !0
        )
    }),
    (mh.semicolon = function () {
      this.eat(Xo.semi) || this.insertSemicolon() || this.unexpected()
    }),
    (mh.afterTrailingComma = function (e, t) {
      if (this.type === e)
        return (
          this.options.onTrailingComma &&
            this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc),
          t || this.next(),
          !0
        )
    }),
    (mh.expect = function (e) {
      this.eat(e) || this.unexpected()
    }),
    (mh.unexpected = function (e) {
      this.raise(null != e ? e : this.start, 'Unexpected token')
    }),
    (mh.checkPatternErrors = function (e, t) {
      if (e) {
        e.trailingComma > -1 &&
          this.raiseRecoverable(e.trailingComma, 'Comma is not permitted after the rest element')
        var s = t ? e.parenthesizedAssign : e.parenthesizedBind
        s > -1 && this.raiseRecoverable(s, 'Parenthesized pattern')
      }
    }),
    (mh.checkExpressionErrors = function (e, t) {
      if (!e) return !1
      var s = e.shorthandAssign,
        i = e.doubleProto
      if (!t) return s >= 0 || i >= 0
      s >= 0 &&
        this.raise(s, 'Shorthand property assignments are valid only in destructuring patterns'),
        i >= 0 && this.raiseRecoverable(i, 'Redefinition of __proto__ property')
    }),
    (mh.checkYieldAwaitInDefaultParams = function () {
      this.yieldPos &&
        (!this.awaitPos || this.yieldPos < this.awaitPos) &&
        this.raise(this.yieldPos, 'Yield expression cannot be a default value'),
        this.awaitPos && this.raise(this.awaitPos, 'Await expression cannot be a default value')
    }),
    (mh.isSimpleAssignTarget = function (e) {
      return 'ParenthesizedExpression' === e.type
        ? this.isSimpleAssignTarget(e.expression)
        : 'Identifier' === e.type || 'MemberExpression' === e.type
    })
  var xh = dh.prototype
  xh.parseTopLevel = function (e) {
    var t = {}
    for (e.body || (e.body = []); this.type !== Xo.eof; ) {
      var s = this.parseStatement(null, !0, t)
      e.body.push(s)
    }
    if (this.inModule)
      for (var i = 0, n = Object.keys(this.undefinedExports); i < n.length; i += 1) {
        var r = n[i]
        this.raiseRecoverable(this.undefinedExports[r].start, "Export '" + r + "' is not defined")
      }
    return (
      this.adaptDirectivePrologue(e.body),
      this.next(),
      (e.sourceType = this.options.sourceType),
      this.finishNode(e, 'Program')
    )
  }
  var vh = { kind: 'loop' },
    Eh = { kind: 'switch' }
  ;(xh.isLet = function (e) {
    if (this.options.ecmaVersion < 6 || !this.isContextual('let')) return !1
    eh.lastIndex = this.pos
    var t = eh.exec(this.input),
      s = this.pos + t[0].length,
      i = this.input.charCodeAt(s)
    if (91 === i) return !0
    if (e) return !1
    if (123 === i) return !0
    if (Wo(i, !0)) {
      for (var n = s + 1; Uo(this.input.charCodeAt(n), !0); ) ++n
      var r = this.input.slice(s, n)
      if (!Mo.test(r)) return !0
    }
    return !1
  }),
    (xh.isAsyncFunction = function () {
      if (this.options.ecmaVersion < 8 || !this.isContextual('async')) return !1
      eh.lastIndex = this.pos
      var e = eh.exec(this.input),
        t = this.pos + e[0].length
      return !(
        Yo.test(this.input.slice(this.pos, t)) ||
        'function' !== this.input.slice(t, t + 8) ||
        (t + 8 !== this.input.length && Uo(this.input.charAt(t + 8)))
      )
    }),
    (xh.parseStatement = function (e, t, s) {
      var i,
        n = this.type,
        r = this.startNode()
      switch ((this.isLet(e) && ((n = Xo._var), (i = 'let')), n)) {
        case Xo._break:
        case Xo._continue:
          return this.parseBreakContinueStatement(r, n.keyword)
        case Xo._debugger:
          return this.parseDebuggerStatement(r)
        case Xo._do:
          return this.parseDoStatement(r)
        case Xo._for:
          return this.parseForStatement(r)
        case Xo._function:
          return (
            e &&
              (this.strict || ('if' !== e && 'label' !== e)) &&
              this.options.ecmaVersion >= 6 &&
              this.unexpected(),
            this.parseFunctionStatement(r, !1, !e)
          )
        case Xo._class:
          return e && this.unexpected(), this.parseClass(r, !0)
        case Xo._if:
          return this.parseIfStatement(r)
        case Xo._return:
          return this.parseReturnStatement(r)
        case Xo._switch:
          return this.parseSwitchStatement(r)
        case Xo._throw:
          return this.parseThrowStatement(r)
        case Xo._try:
          return this.parseTryStatement(r)
        case Xo._const:
        case Xo._var:
          return (
            (i = i || this.value),
            e && 'var' !== i && this.unexpected(),
            this.parseVarStatement(r, i)
          )
        case Xo._while:
          return this.parseWhileStatement(r)
        case Xo._with:
          return this.parseWithStatement(r)
        case Xo.braceL:
          return this.parseBlock(!0, r)
        case Xo.semi:
          return this.parseEmptyStatement(r)
        case Xo._export:
        case Xo._import:
          if (this.options.ecmaVersion > 10 && n === Xo._import) {
            eh.lastIndex = this.pos
            var a = eh.exec(this.input),
              o = this.pos + a[0].length
            if (40 === this.input.charCodeAt(o))
              return this.parseExpressionStatement(r, this.parseExpression())
          }
          return (
            this.options.allowImportExportEverywhere ||
              (t ||
                this.raise(this.start, "'import' and 'export' may only appear at the top level"),
              this.inModule ||
                this.raise(
                  this.start,
                  "'import' and 'export' may appear only with 'sourceType: module'"
                )),
            n === Xo._import ? this.parseImport(r) : this.parseExport(r, s)
          )
        default:
          if (this.isAsyncFunction())
            return e && this.unexpected(), this.next(), this.parseFunctionStatement(r, !0, !e)
          var h = this.value,
            l = this.parseExpression()
          return n === Xo.name && 'Identifier' === l.type && this.eat(Xo.colon)
            ? this.parseLabeledStatement(r, h, l, e)
            : this.parseExpressionStatement(r, l)
      }
    }),
    (xh.parseBreakContinueStatement = function (e, t) {
      var s = 'break' === t
      this.next(),
        this.eat(Xo.semi) || this.insertSemicolon()
          ? (e.label = null)
          : this.type !== Xo.name
            ? this.unexpected()
            : ((e.label = this.parseIdent()), this.semicolon())
      for (var i = 0; i < this.labels.length; ++i) {
        var n = this.labels[i]
        if (null == e.label || n.name === e.label.name) {
          if (null != n.kind && (s || 'loop' === n.kind)) break
          if (e.label && s) break
        }
      }
      return (
        i === this.labels.length && this.raise(e.start, 'Unsyntactic ' + t),
        this.finishNode(e, s ? 'BreakStatement' : 'ContinueStatement')
      )
    }),
    (xh.parseDebuggerStatement = function (e) {
      return this.next(), this.semicolon(), this.finishNode(e, 'DebuggerStatement')
    }),
    (xh.parseDoStatement = function (e) {
      return (
        this.next(),
        this.labels.push(vh),
        (e.body = this.parseStatement('do')),
        this.labels.pop(),
        this.expect(Xo._while),
        (e.test = this.parseParenExpression()),
        this.options.ecmaVersion >= 6 ? this.eat(Xo.semi) : this.semicolon(),
        this.finishNode(e, 'DoWhileStatement')
      )
    }),
    (xh.parseForStatement = function (e) {
      this.next()
      var t =
        this.options.ecmaVersion >= 9 &&
        (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction)) &&
        this.eatContextual('await')
          ? this.lastTokStart
          : -1
      if ((this.labels.push(vh), this.enterScope(0), this.expect(Xo.parenL), this.type === Xo.semi))
        return t > -1 && this.unexpected(t), this.parseFor(e, null)
      var s = this.isLet()
      if (this.type === Xo._var || this.type === Xo._const || s) {
        var i = this.startNode(),
          n = s ? 'let' : this.value
        return (
          this.next(),
          this.parseVar(i, !0, n),
          this.finishNode(i, 'VariableDeclaration'),
          (this.type === Xo._in || (this.options.ecmaVersion >= 6 && this.isContextual('of'))) &&
          1 === i.declarations.length
            ? (this.options.ecmaVersion >= 9 &&
                (this.type === Xo._in ? t > -1 && this.unexpected(t) : (e.await = t > -1)),
              this.parseForIn(e, i))
            : (t > -1 && this.unexpected(t), this.parseFor(e, i))
        )
      }
      var r = new yh(),
        a = this.parseExpression(!0, r)
      return this.type === Xo._in || (this.options.ecmaVersion >= 6 && this.isContextual('of'))
        ? (this.options.ecmaVersion >= 9 &&
            (this.type === Xo._in ? t > -1 && this.unexpected(t) : (e.await = t > -1)),
          this.toAssignable(a, !1, r),
          this.checkLVal(a),
          this.parseForIn(e, a))
        : (this.checkExpressionErrors(r, !0), t > -1 && this.unexpected(t), this.parseFor(e, a))
    }),
    (xh.parseFunctionStatement = function (e, t, s) {
      return this.next(), this.parseFunction(e, Sh | (s ? 0 : _h), !1, t)
    }),
    (xh.parseIfStatement = function (e) {
      return (
        this.next(),
        (e.test = this.parseParenExpression()),
        (e.consequent = this.parseStatement('if')),
        (e.alternate = this.eat(Xo._else) ? this.parseStatement('if') : null),
        this.finishNode(e, 'IfStatement')
      )
    }),
    (xh.parseReturnStatement = function (e) {
      return (
        this.inFunction ||
          this.options.allowReturnOutsideFunction ||
          this.raise(this.start, "'return' outside of function"),
        this.next(),
        this.eat(Xo.semi) || this.insertSemicolon()
          ? (e.argument = null)
          : ((e.argument = this.parseExpression()), this.semicolon()),
        this.finishNode(e, 'ReturnStatement')
      )
    }),
    (xh.parseSwitchStatement = function (e) {
      var t
      this.next(),
        (e.discriminant = this.parseParenExpression()),
        (e.cases = []),
        this.expect(Xo.braceL),
        this.labels.push(Eh),
        this.enterScope(0)
      for (var s = !1; this.type !== Xo.braceR; )
        if (this.type === Xo._case || this.type === Xo._default) {
          var i = this.type === Xo._case
          t && this.finishNode(t, 'SwitchCase'),
            e.cases.push((t = this.startNode())),
            (t.consequent = []),
            this.next(),
            i
              ? (t.test = this.parseExpression())
              : (s && this.raiseRecoverable(this.lastTokStart, 'Multiple default clauses'),
                (s = !0),
                (t.test = null)),
            this.expect(Xo.colon)
        } else t || this.unexpected(), t.consequent.push(this.parseStatement(null))
      return (
        this.exitScope(),
        t && this.finishNode(t, 'SwitchCase'),
        this.next(),
        this.labels.pop(),
        this.finishNode(e, 'SwitchStatement')
      )
    }),
    (xh.parseThrowStatement = function (e) {
      return (
        this.next(),
        Yo.test(this.input.slice(this.lastTokEnd, this.start)) &&
          this.raise(this.lastTokEnd, 'Illegal newline after throw'),
        (e.argument = this.parseExpression()),
        this.semicolon(),
        this.finishNode(e, 'ThrowStatement')
      )
    })
  var bh = []
  ;(xh.parseTryStatement = function (e) {
    if ((this.next(), (e.block = this.parseBlock()), (e.handler = null), this.type === Xo._catch)) {
      var t = this.startNode()
      if ((this.next(), this.eat(Xo.parenL))) {
        t.param = this.parseBindingAtom()
        var s = 'Identifier' === t.param.type
        this.enterScope(s ? 32 : 0), this.checkLVal(t.param, s ? 4 : 2), this.expect(Xo.parenR)
      } else
        this.options.ecmaVersion < 10 && this.unexpected(), (t.param = null), this.enterScope(0)
      ;(t.body = this.parseBlock(!1)),
        this.exitScope(),
        (e.handler = this.finishNode(t, 'CatchClause'))
    }
    return (
      (e.finalizer = this.eat(Xo._finally) ? this.parseBlock() : null),
      e.handler || e.finalizer || this.raise(e.start, 'Missing catch or finally clause'),
      this.finishNode(e, 'TryStatement')
    )
  }),
    (xh.parseVarStatement = function (e, t) {
      return (
        this.next(),
        this.parseVar(e, !1, t),
        this.semicolon(),
        this.finishNode(e, 'VariableDeclaration')
      )
    }),
    (xh.parseWhileStatement = function (e) {
      return (
        this.next(),
        (e.test = this.parseParenExpression()),
        this.labels.push(vh),
        (e.body = this.parseStatement('while')),
        this.labels.pop(),
        this.finishNode(e, 'WhileStatement')
      )
    }),
    (xh.parseWithStatement = function (e) {
      return (
        this.strict && this.raise(this.start, "'with' in strict mode"),
        this.next(),
        (e.object = this.parseParenExpression()),
        (e.body = this.parseStatement('with')),
        this.finishNode(e, 'WithStatement')
      )
    }),
    (xh.parseEmptyStatement = function (e) {
      return this.next(), this.finishNode(e, 'EmptyStatement')
    }),
    (xh.parseLabeledStatement = function (e, t, s, i) {
      for (var n = 0, r = this.labels; n < r.length; n += 1) {
        r[n].name === t && this.raise(s.start, "Label '" + t + "' is already declared")
      }
      for (
        var a = this.type.isLoop ? 'loop' : this.type === Xo._switch ? 'switch' : null,
          o = this.labels.length - 1;
        o >= 0;
        o--
      ) {
        var h = this.labels[o]
        if (h.statementStart !== e.start) break
        ;(h.statementStart = this.start), (h.kind = a)
      }
      return (
        this.labels.push({ name: t, kind: a, statementStart: this.start }),
        (e.body = this.parseStatement(i ? (-1 === i.indexOf('label') ? i + 'label' : i) : 'label')),
        this.labels.pop(),
        (e.label = s),
        this.finishNode(e, 'LabeledStatement')
      )
    }),
    (xh.parseExpressionStatement = function (e, t) {
      return (e.expression = t), this.semicolon(), this.finishNode(e, 'ExpressionStatement')
    }),
    (xh.parseBlock = function (e, t) {
      for (
        void 0 === e && (e = !0),
          void 0 === t && (t = this.startNode()),
          t.body = [],
          this.expect(Xo.braceL),
          e && this.enterScope(0);
        !this.eat(Xo.braceR);

      ) {
        var s = this.parseStatement(null)
        t.body.push(s)
      }
      return e && this.exitScope(), this.finishNode(t, 'BlockStatement')
    }),
    (xh.parseFor = function (e, t) {
      return (
        (e.init = t),
        this.expect(Xo.semi),
        (e.test = this.type === Xo.semi ? null : this.parseExpression()),
        this.expect(Xo.semi),
        (e.update = this.type === Xo.parenR ? null : this.parseExpression()),
        this.expect(Xo.parenR),
        (e.body = this.parseStatement('for')),
        this.exitScope(),
        this.labels.pop(),
        this.finishNode(e, 'ForStatement')
      )
    }),
    (xh.parseForIn = function (e, t) {
      var s = this.type === Xo._in
      return (
        this.next(),
        'VariableDeclaration' === t.type &&
        null != t.declarations[0].init &&
        (!s ||
          this.options.ecmaVersion < 8 ||
          this.strict ||
          'var' !== t.kind ||
          'Identifier' !== t.declarations[0].id.type)
          ? this.raise(
              t.start,
              (s ? 'for-in' : 'for-of') + ' loop variable declaration may not have an initializer'
            )
          : 'AssignmentPattern' === t.type &&
            this.raise(t.start, 'Invalid left-hand side in for-loop'),
        (e.left = t),
        (e.right = s ? this.parseExpression() : this.parseMaybeAssign()),
        this.expect(Xo.parenR),
        (e.body = this.parseStatement('for')),
        this.exitScope(),
        this.labels.pop(),
        this.finishNode(e, s ? 'ForInStatement' : 'ForOfStatement')
      )
    }),
    (xh.parseVar = function (e, t, s) {
      for (e.declarations = [], e.kind = s; ; ) {
        var i = this.startNode()
        if (
          (this.parseVarId(i, s),
          this.eat(Xo.eq)
            ? (i.init = this.parseMaybeAssign(t))
            : 'const' !== s ||
                this.type === Xo._in ||
                (this.options.ecmaVersion >= 6 && this.isContextual('of'))
              ? 'Identifier' === i.id.type ||
                (t && (this.type === Xo._in || this.isContextual('of')))
                ? (i.init = null)
                : this.raise(
                    this.lastTokEnd,
                    'Complex binding patterns require an initialization value'
                  )
              : this.unexpected(),
          e.declarations.push(this.finishNode(i, 'VariableDeclarator')),
          !this.eat(Xo.comma))
        )
          break
      }
      return e
    }),
    (xh.parseVarId = function (e, t) {
      ;(e.id = this.parseBindingAtom()), this.checkLVal(e.id, 'var' === t ? 1 : 2, !1)
    })
  var Sh = 1,
    _h = 2
  ;(xh.parseFunction = function (e, t, s, i) {
    this.initFunction(e),
      (this.options.ecmaVersion >= 9 || (this.options.ecmaVersion >= 6 && !i)) &&
        (this.type === Xo.star && t & _h && this.unexpected(), (e.generator = this.eat(Xo.star))),
      this.options.ecmaVersion >= 8 && (e.async = !!i),
      t & Sh &&
        ((e.id = 4 & t && this.type !== Xo.name ? null : this.parseIdent()),
        !e.id ||
          t & _h ||
          this.checkLVal(
            e.id,
            this.strict || e.generator || e.async ? (this.treatFunctionsAsVar ? 1 : 2) : 3
          ))
    var n = this.yieldPos,
      r = this.awaitPos,
      a = this.awaitIdentPos
    return (
      (this.yieldPos = 0),
      (this.awaitPos = 0),
      (this.awaitIdentPos = 0),
      this.enterScope(ph(e.async, e.generator)),
      t & Sh || (e.id = this.type === Xo.name ? this.parseIdent() : null),
      this.parseFunctionParams(e),
      this.parseFunctionBody(e, s, !1),
      (this.yieldPos = n),
      (this.awaitPos = r),
      (this.awaitIdentPos = a),
      this.finishNode(e, t & Sh ? 'FunctionDeclaration' : 'FunctionExpression')
    )
  }),
    (xh.parseFunctionParams = function (e) {
      this.expect(Xo.parenL),
        (e.params = this.parseBindingList(Xo.parenR, !1, this.options.ecmaVersion >= 8)),
        this.checkYieldAwaitInDefaultParams()
    }),
    (xh.parseClass = function (e, t) {
      this.next()
      var s = this.strict
      ;(this.strict = !0), this.parseClassId(e, t), this.parseClassSuper(e)
      var i = this.startNode(),
        n = !1
      for (i.body = [], this.expect(Xo.braceL); !this.eat(Xo.braceR); ) {
        var r = this.parseClassElement(null !== e.superClass)
        r &&
          (i.body.push(r),
          'MethodDefinition' === r.type &&
            'constructor' === r.kind &&
            (n && this.raise(r.start, 'Duplicate constructor in the same class'), (n = !0)))
      }
      return (
        (e.body = this.finishNode(i, 'ClassBody')),
        (this.strict = s),
        this.finishNode(e, t ? 'ClassDeclaration' : 'ClassExpression')
      )
    }),
    (xh.parseClassElement = function (e) {
      var t = this
      if (this.eat(Xo.semi)) return null
      var s = this.startNode(),
        i = function (e, i) {
          void 0 === i && (i = !1)
          var n = t.start,
            r = t.startLoc
          return (
            !!t.eatContextual(e) &&
            (!(t.type === Xo.parenL || (i && t.canInsertSemicolon())) ||
              (s.key && t.unexpected(),
              (s.computed = !1),
              (s.key = t.startNodeAt(n, r)),
              (s.key.name = e),
              t.finishNode(s.key, 'Identifier'),
              !1))
          )
        }
      ;(s.kind = 'method'), (s.static = i('static'))
      var n = this.eat(Xo.star),
        r = !1
      n ||
        (this.options.ecmaVersion >= 8 && i('async', !0)
          ? ((r = !0), (n = this.options.ecmaVersion >= 9 && this.eat(Xo.star)))
          : i('get')
            ? (s.kind = 'get')
            : i('set') && (s.kind = 'set')),
        s.key || this.parsePropertyName(s)
      var a = s.key,
        o = !1
      return (
        s.computed ||
        s.static ||
        !(
          ('Identifier' === a.type && 'constructor' === a.name) ||
          ('Literal' === a.type && 'constructor' === a.value)
        )
          ? s.static &&
            'Identifier' === a.type &&
            'prototype' === a.name &&
            this.raise(a.start, 'Classes may not have a static property named prototype')
          : ('method' !== s.kind && this.raise(a.start, "Constructor can't have get/set modifier"),
            n && this.raise(a.start, "Constructor can't be a generator"),
            r && this.raise(a.start, "Constructor can't be an async method"),
            (s.kind = 'constructor'),
            (o = e)),
        this.parseClassMethod(s, n, r, o),
        'get' === s.kind &&
          0 !== s.value.params.length &&
          this.raiseRecoverable(s.value.start, 'getter should have no params'),
        'set' === s.kind &&
          1 !== s.value.params.length &&
          this.raiseRecoverable(s.value.start, 'setter should have exactly one param'),
        'set' === s.kind &&
          'RestElement' === s.value.params[0].type &&
          this.raiseRecoverable(s.value.params[0].start, 'Setter cannot use rest params'),
        s
      )
    }),
    (xh.parseClassMethod = function (e, t, s, i) {
      return (e.value = this.parseMethod(t, s, i)), this.finishNode(e, 'MethodDefinition')
    }),
    (xh.parseClassId = function (e, t) {
      this.type === Xo.name
        ? ((e.id = this.parseIdent()), t && this.checkLVal(e.id, 2, !1))
        : (!0 === t && this.unexpected(), (e.id = null))
    }),
    (xh.parseClassSuper = function (e) {
      e.superClass = this.eat(Xo._extends) ? this.parseExprSubscripts() : null
    }),
    (xh.parseExport = function (e, t) {
      if ((this.next(), this.eat(Xo.star)))
        return (
          this.expectContextual('from'),
          this.type !== Xo.string && this.unexpected(),
          (e.source = this.parseExprAtom()),
          this.semicolon(),
          this.finishNode(e, 'ExportAllDeclaration')
        )
      if (this.eat(Xo._default)) {
        var s
        if (
          (this.checkExport(t, 'default', this.lastTokStart),
          this.type === Xo._function || (s = this.isAsyncFunction()))
        ) {
          var i = this.startNode()
          this.next(), s && this.next(), (e.declaration = this.parseFunction(i, 4 | Sh, !1, s))
        } else if (this.type === Xo._class) {
          var n = this.startNode()
          e.declaration = this.parseClass(n, 'nullableID')
        } else (e.declaration = this.parseMaybeAssign()), this.semicolon()
        return this.finishNode(e, 'ExportDefaultDeclaration')
      }
      if (this.shouldParseExportStatement())
        (e.declaration = this.parseStatement(null)),
          'VariableDeclaration' === e.declaration.type
            ? this.checkVariableExport(t, e.declaration.declarations)
            : this.checkExport(t, e.declaration.id.name, e.declaration.id.start),
          (e.specifiers = []),
          (e.source = null)
      else {
        if (
          ((e.declaration = null),
          (e.specifiers = this.parseExportSpecifiers(t)),
          this.eatContextual('from'))
        )
          this.type !== Xo.string && this.unexpected(), (e.source = this.parseExprAtom())
        else {
          for (var r = 0, a = e.specifiers; r < a.length; r += 1) {
            var o = a[r]
            this.checkUnreserved(o.local), this.checkLocalExport(o.local)
          }
          e.source = null
        }
        this.semicolon()
      }
      return this.finishNode(e, 'ExportNamedDeclaration')
    }),
    (xh.checkExport = function (e, t, s) {
      e && (nh(e, t) && this.raiseRecoverable(s, "Duplicate export '" + t + "'"), (e[t] = !0))
    }),
    (xh.checkPatternExport = function (e, t) {
      var s = t.type
      if ('Identifier' === s) this.checkExport(e, t.name, t.start)
      else if ('ObjectPattern' === s)
        for (var i = 0, n = t.properties; i < n.length; i += 1) {
          var r = n[i]
          this.checkPatternExport(e, r)
        }
      else if ('ArrayPattern' === s)
        for (var a = 0, o = t.elements; a < o.length; a += 1) {
          var h = o[a]
          h && this.checkPatternExport(e, h)
        }
      else
        'Property' === s
          ? this.checkPatternExport(e, t.value)
          : 'AssignmentPattern' === s
            ? this.checkPatternExport(e, t.left)
            : 'RestElement' === s
              ? this.checkPatternExport(e, t.argument)
              : 'ParenthesizedExpression' === s && this.checkPatternExport(e, t.expression)
    }),
    (xh.checkVariableExport = function (e, t) {
      if (e)
        for (var s = 0, i = t; s < i.length; s += 1) {
          var n = i[s]
          this.checkPatternExport(e, n.id)
        }
    }),
    (xh.shouldParseExportStatement = function () {
      return (
        'var' === this.type.keyword ||
        'const' === this.type.keyword ||
        'class' === this.type.keyword ||
        'function' === this.type.keyword ||
        this.isLet() ||
        this.isAsyncFunction()
      )
    }),
    (xh.parseExportSpecifiers = function (e) {
      var t = [],
        s = !0
      for (this.expect(Xo.braceL); !this.eat(Xo.braceR); ) {
        if (s) s = !1
        else if ((this.expect(Xo.comma), this.afterTrailingComma(Xo.braceR))) break
        var i = this.startNode()
        ;(i.local = this.parseIdent(!0)),
          (i.exported = this.eatContextual('as') ? this.parseIdent(!0) : i.local),
          this.checkExport(e, i.exported.name, i.exported.start),
          t.push(this.finishNode(i, 'ExportSpecifier'))
      }
      return t
    }),
    (xh.parseImport = function (e) {
      return (
        this.next(),
        this.type === Xo.string
          ? ((e.specifiers = bh), (e.source = this.parseExprAtom()))
          : ((e.specifiers = this.parseImportSpecifiers()),
            this.expectContextual('from'),
            (e.source = this.type === Xo.string ? this.parseExprAtom() : this.unexpected())),
        this.semicolon(),
        this.finishNode(e, 'ImportDeclaration')
      )
    }),
    (xh.parseImportSpecifiers = function () {
      var e = [],
        t = !0
      if (this.type === Xo.name) {
        var s = this.startNode()
        if (
          ((s.local = this.parseIdent()),
          this.checkLVal(s.local, 2),
          e.push(this.finishNode(s, 'ImportDefaultSpecifier')),
          !this.eat(Xo.comma))
        )
          return e
      }
      if (this.type === Xo.star) {
        var i = this.startNode()
        return (
          this.next(),
          this.expectContextual('as'),
          (i.local = this.parseIdent()),
          this.checkLVal(i.local, 2),
          e.push(this.finishNode(i, 'ImportNamespaceSpecifier')),
          e
        )
      }
      for (this.expect(Xo.braceL); !this.eat(Xo.braceR); ) {
        if (t) t = !1
        else if ((this.expect(Xo.comma), this.afterTrailingComma(Xo.braceR))) break
        var n = this.startNode()
        ;(n.imported = this.parseIdent(!0)),
          this.eatContextual('as')
            ? (n.local = this.parseIdent())
            : (this.checkUnreserved(n.imported), (n.local = n.imported)),
          this.checkLVal(n.local, 2),
          e.push(this.finishNode(n, 'ImportSpecifier'))
      }
      return e
    }),
    (xh.adaptDirectivePrologue = function (e) {
      for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
        e[t].directive = e[t].expression.raw.slice(1, -1)
    }),
    (xh.isDirectiveCandidate = function (e) {
      return (
        'ExpressionStatement' === e.type &&
        'Literal' === e.expression.type &&
        'string' == typeof e.expression.value &&
        ('"' === this.input[e.start] || "'" === this.input[e.start])
      )
    })
  var Ah = dh.prototype
  ;(Ah.toAssignable = function (e, t, s) {
    if (this.options.ecmaVersion >= 6 && e)
      switch (e.type) {
        case 'Identifier':
          this.inAsync &&
            'await' === e.name &&
            this.raise(e.start, "Cannot use 'await' as identifier inside an async function")
          break
        case 'ObjectPattern':
        case 'ArrayPattern':
        case 'RestElement':
          break
        case 'ObjectExpression':
          ;(e.type = 'ObjectPattern'), s && this.checkPatternErrors(s, !0)
          for (var i = 0, n = e.properties; i < n.length; i += 1) {
            var r = n[i]
            this.toAssignable(r, t),
              'RestElement' !== r.type ||
                ('ArrayPattern' !== r.argument.type && 'ObjectPattern' !== r.argument.type) ||
                this.raise(r.argument.start, 'Unexpected token')
          }
          break
        case 'Property':
          'init' !== e.kind &&
            this.raise(e.key.start, "Object pattern can't contain getter or setter"),
            this.toAssignable(e.value, t)
          break
        case 'ArrayExpression':
          ;(e.type = 'ArrayPattern'),
            s && this.checkPatternErrors(s, !0),
            this.toAssignableList(e.elements, t)
          break
        case 'SpreadElement':
          ;(e.type = 'RestElement'),
            this.toAssignable(e.argument, t),
            'AssignmentPattern' === e.argument.type &&
              this.raise(e.argument.start, 'Rest elements cannot have a default value')
          break
        case 'AssignmentExpression':
          '=' !== e.operator &&
            this.raise(e.left.end, "Only '=' operator can be used for specifying default value."),
            (e.type = 'AssignmentPattern'),
            delete e.operator,
            this.toAssignable(e.left, t)
        case 'AssignmentPattern':
          break
        case 'ParenthesizedExpression':
          this.toAssignable(e.expression, t, s)
          break
        case 'MemberExpression':
          if (!t) break
        default:
          this.raise(e.start, 'Assigning to rvalue')
      }
    else s && this.checkPatternErrors(s, !0)
    return e
  }),
    (Ah.toAssignableList = function (e, t) {
      for (var s = e.length, i = 0; i < s; i++) {
        var n = e[i]
        n && this.toAssignable(n, t)
      }
      if (s) {
        var r = e[s - 1]
        6 === this.options.ecmaVersion &&
          t &&
          r &&
          'RestElement' === r.type &&
          'Identifier' !== r.argument.type &&
          this.unexpected(r.argument.start)
      }
      return e
    }),
    (Ah.parseSpread = function (e) {
      var t = this.startNode()
      return (
        this.next(),
        (t.argument = this.parseMaybeAssign(!1, e)),
        this.finishNode(t, 'SpreadElement')
      )
    }),
    (Ah.parseRestBinding = function () {
      var e = this.startNode()
      return (
        this.next(),
        6 === this.options.ecmaVersion && this.type !== Xo.name && this.unexpected(),
        (e.argument = this.parseBindingAtom()),
        this.finishNode(e, 'RestElement')
      )
    }),
    (Ah.parseBindingAtom = function () {
      if (this.options.ecmaVersion >= 6)
        switch (this.type) {
          case Xo.bracketL:
            var e = this.startNode()
            return (
              this.next(),
              (e.elements = this.parseBindingList(Xo.bracketR, !0, !0)),
              this.finishNode(e, 'ArrayPattern')
            )
          case Xo.braceL:
            return this.parseObj(!0)
        }
      return this.parseIdent()
    }),
    (Ah.parseBindingList = function (e, t, s) {
      for (var i = [], n = !0; !this.eat(e); )
        if ((n ? (n = !1) : this.expect(Xo.comma), t && this.type === Xo.comma)) i.push(null)
        else {
          if (s && this.afterTrailingComma(e)) break
          if (this.type === Xo.ellipsis) {
            var r = this.parseRestBinding()
            this.parseBindingListItem(r),
              i.push(r),
              this.type === Xo.comma &&
                this.raise(this.start, 'Comma is not permitted after the rest element'),
              this.expect(e)
            break
          }
          var a = this.parseMaybeDefault(this.start, this.startLoc)
          this.parseBindingListItem(a), i.push(a)
        }
      return i
    }),
    (Ah.parseBindingListItem = function (e) {
      return e
    }),
    (Ah.parseMaybeDefault = function (e, t, s) {
      if (((s = s || this.parseBindingAtom()), this.options.ecmaVersion < 6 || !this.eat(Xo.eq)))
        return s
      var i = this.startNodeAt(e, t)
      return (
        (i.left = s), (i.right = this.parseMaybeAssign()), this.finishNode(i, 'AssignmentPattern')
      )
    }),
    (Ah.checkLVal = function (e, t, s) {
      switch ((void 0 === t && (t = 0), e.type)) {
        case 'Identifier':
          2 === t &&
            'let' === e.name &&
            this.raiseRecoverable(e.start, 'let is disallowed as a lexically bound name'),
            this.strict &&
              this.reservedWordsStrictBind.test(e.name) &&
              this.raiseRecoverable(
                e.start,
                (t ? 'Binding ' : 'Assigning to ') + e.name + ' in strict mode'
              ),
            s &&
              (nh(s, e.name) && this.raiseRecoverable(e.start, 'Argument name clash'),
              (s[e.name] = !0)),
            0 !== t && 5 !== t && this.declareName(e.name, t, e.start)
          break
        case 'MemberExpression':
          t && this.raiseRecoverable(e.start, 'Binding member expression')
          break
        case 'ObjectPattern':
          for (var i = 0, n = e.properties; i < n.length; i += 1) {
            var r = n[i]
            this.checkLVal(r, t, s)
          }
          break
        case 'Property':
          this.checkLVal(e.value, t, s)
          break
        case 'ArrayPattern':
          for (var a = 0, o = e.elements; a < o.length; a += 1) {
            var h = o[a]
            h && this.checkLVal(h, t, s)
          }
          break
        case 'AssignmentPattern':
          this.checkLVal(e.left, t, s)
          break
        case 'RestElement':
          this.checkLVal(e.argument, t, s)
          break
        case 'ParenthesizedExpression':
          this.checkLVal(e.expression, t, s)
          break
        default:
          this.raise(e.start, (t ? 'Binding' : 'Assigning to') + ' rvalue')
      }
    })
  var kh = dh.prototype
  ;(kh.checkPropClash = function (e, t, s) {
    if (
      !(
        (this.options.ecmaVersion >= 9 && 'SpreadElement' === e.type) ||
        (this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))
      )
    ) {
      var i,
        n = e.key
      switch (n.type) {
        case 'Identifier':
          i = n.name
          break
        case 'Literal':
          i = String(n.value)
          break
        default:
          return
      }
      var r = e.kind
      if (this.options.ecmaVersion >= 6)
        '__proto__' === i &&
          'init' === r &&
          (t.proto &&
            (s
              ? s.doubleProto < 0 && (s.doubleProto = n.start)
              : this.raiseRecoverable(n.start, 'Redefinition of __proto__ property')),
          (t.proto = !0))
      else {
        var a = t[(i = '$' + i)]
        if (a)
          ('init' === r ? (this.strict && a.init) || a.get || a.set : a.init || a[r]) &&
            this.raiseRecoverable(n.start, 'Redefinition of property')
        else a = t[i] = { init: !1, get: !1, set: !1 }
        a[r] = !0
      }
    }
  }),
    (kh.parseExpression = function (e, t) {
      var s = this.start,
        i = this.startLoc,
        n = this.parseMaybeAssign(e, t)
      if (this.type === Xo.comma) {
        var r = this.startNodeAt(s, i)
        for (r.expressions = [n]; this.eat(Xo.comma); )
          r.expressions.push(this.parseMaybeAssign(e, t))
        return this.finishNode(r, 'SequenceExpression')
      }
      return n
    }),
    (kh.parseMaybeAssign = function (e, t, s) {
      if (this.isContextual('yield')) {
        if (this.inGenerator) return this.parseYield(e)
        this.exprAllowed = !1
      }
      var i = !1,
        n = -1,
        r = -1
      t
        ? ((n = t.parenthesizedAssign),
          (r = t.trailingComma),
          (t.parenthesizedAssign = t.trailingComma = -1))
        : ((t = new yh()), (i = !0))
      var a = this.start,
        o = this.startLoc
      ;(this.type !== Xo.parenL && this.type !== Xo.name) || (this.potentialArrowAt = this.start)
      var h = this.parseMaybeConditional(e, t)
      if ((s && (h = s.call(this, h, a, o)), this.type.isAssign)) {
        var l = this.startNodeAt(a, o)
        return (
          (l.operator = this.value),
          (l.left = this.type === Xo.eq ? this.toAssignable(h, !1, t) : h),
          i || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1),
          t.shorthandAssign >= l.left.start && (t.shorthandAssign = -1),
          this.checkLVal(h),
          this.next(),
          (l.right = this.parseMaybeAssign(e)),
          this.finishNode(l, 'AssignmentExpression')
        )
      }
      return (
        i && this.checkExpressionErrors(t, !0),
        n > -1 && (t.parenthesizedAssign = n),
        r > -1 && (t.trailingComma = r),
        h
      )
    }),
    (kh.parseMaybeConditional = function (e, t) {
      var s = this.start,
        i = this.startLoc,
        n = this.parseExprOps(e, t)
      if (this.checkExpressionErrors(t)) return n
      if (this.eat(Xo.question)) {
        var r = this.startNodeAt(s, i)
        return (
          (r.test = n),
          (r.consequent = this.parseMaybeAssign()),
          this.expect(Xo.colon),
          (r.alternate = this.parseMaybeAssign(e)),
          this.finishNode(r, 'ConditionalExpression')
        )
      }
      return n
    }),
    (kh.parseExprOps = function (e, t) {
      var s = this.start,
        i = this.startLoc,
        n = this.parseMaybeUnary(t, !1)
      return this.checkExpressionErrors(t) ||
        (n.start === s && 'ArrowFunctionExpression' === n.type)
        ? n
        : this.parseExprOp(n, s, i, -1, e)
    }),
    (kh.parseExprOp = function (e, t, s, i, n) {
      var r = this.type.binop
      if (null != r && (!n || this.type !== Xo._in) && r > i) {
        var a = this.type === Xo.logicalOR || this.type === Xo.logicalAND,
          o = this.value
        this.next()
        var h = this.start,
          l = this.startLoc,
          c = this.parseExprOp(this.parseMaybeUnary(null, !1), h, l, r, n),
          u = this.buildBinary(t, s, e, c, o, a)
        return this.parseExprOp(u, t, s, i, n)
      }
      return e
    }),
    (kh.buildBinary = function (e, t, s, i, n, r) {
      var a = this.startNodeAt(e, t)
      return (
        (a.left = s),
        (a.operator = n),
        (a.right = i),
        this.finishNode(a, r ? 'LogicalExpression' : 'BinaryExpression')
      )
    }),
    (kh.parseMaybeUnary = function (e, t) {
      var s,
        i = this.start,
        n = this.startLoc
      if (
        this.isContextual('await') &&
        (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction))
      )
        (s = this.parseAwait()), (t = !0)
      else if (this.type.prefix) {
        var r = this.startNode(),
          a = this.type === Xo.incDec
        ;(r.operator = this.value),
          (r.prefix = !0),
          this.next(),
          (r.argument = this.parseMaybeUnary(null, !0)),
          this.checkExpressionErrors(e, !0),
          a
            ? this.checkLVal(r.argument)
            : this.strict && 'delete' === r.operator && 'Identifier' === r.argument.type
              ? this.raiseRecoverable(r.start, 'Deleting local variable in strict mode')
              : (t = !0),
          (s = this.finishNode(r, a ? 'UpdateExpression' : 'UnaryExpression'))
      } else {
        if (((s = this.parseExprSubscripts(e)), this.checkExpressionErrors(e))) return s
        for (; this.type.postfix && !this.canInsertSemicolon(); ) {
          var o = this.startNodeAt(i, n)
          ;(o.operator = this.value),
            (o.prefix = !1),
            (o.argument = s),
            this.checkLVal(s),
            this.next(),
            (s = this.finishNode(o, 'UpdateExpression'))
        }
      }
      return !t && this.eat(Xo.starstar)
        ? this.buildBinary(i, n, s, this.parseMaybeUnary(null, !1), '**', !1)
        : s
    }),
    (kh.parseExprSubscripts = function (e) {
      var t = this.start,
        s = this.startLoc,
        i = this.parseExprAtom(e)
      if (
        'ArrowFunctionExpression' === i.type &&
        ')' !== this.input.slice(this.lastTokStart, this.lastTokEnd)
      )
        return i
      var n = this.parseSubscripts(i, t, s)
      return (
        e &&
          'MemberExpression' === n.type &&
          (e.parenthesizedAssign >= n.start && (e.parenthesizedAssign = -1),
          e.parenthesizedBind >= n.start && (e.parenthesizedBind = -1)),
        n
      )
    }),
    (kh.parseSubscripts = function (e, t, s, i) {
      for (
        var n =
          this.options.ecmaVersion >= 8 &&
          'Identifier' === e.type &&
          'async' === e.name &&
          this.lastTokEnd === e.end &&
          !this.canInsertSemicolon() &&
          'async' === this.input.slice(e.start, e.end);
        ;

      ) {
        var r = this.parseSubscript(e, t, s, i, n)
        if (r === e || 'ArrowFunctionExpression' === r.type) return r
        e = r
      }
    }),
    (kh.parseSubscript = function (e, t, s, i, n) {
      var r = this.eat(Xo.bracketL)
      if (r || this.eat(Xo.dot)) {
        var a = this.startNodeAt(t, s)
        ;(a.object = e),
          (a.property = r
            ? this.parseExpression()
            : this.parseIdent('never' !== this.options.allowReserved)),
          (a.computed = !!r),
          r && this.expect(Xo.bracketR),
          (e = this.finishNode(a, 'MemberExpression'))
      } else if (!i && this.eat(Xo.parenL)) {
        var o = new yh(),
          h = this.yieldPos,
          l = this.awaitPos,
          c = this.awaitIdentPos
        ;(this.yieldPos = 0), (this.awaitPos = 0), (this.awaitIdentPos = 0)
        var u = this.parseExprList(Xo.parenR, this.options.ecmaVersion >= 8, !1, o)
        if (n && !this.canInsertSemicolon() && this.eat(Xo.arrow))
          return (
            this.checkPatternErrors(o, !1),
            this.checkYieldAwaitInDefaultParams(),
            this.awaitIdentPos > 0 &&
              this.raise(
                this.awaitIdentPos,
                "Cannot use 'await' as identifier inside an async function"
              ),
            (this.yieldPos = h),
            (this.awaitPos = l),
            (this.awaitIdentPos = c),
            this.parseArrowExpression(this.startNodeAt(t, s), u, !0)
          )
        this.checkExpressionErrors(o, !0),
          (this.yieldPos = h || this.yieldPos),
          (this.awaitPos = l || this.awaitPos),
          (this.awaitIdentPos = c || this.awaitIdentPos)
        var p = this.startNodeAt(t, s)
        ;(p.callee = e), (p.arguments = u), (e = this.finishNode(p, 'CallExpression'))
      } else if (this.type === Xo.backQuote) {
        var d = this.startNodeAt(t, s)
        ;(d.tag = e),
          (d.quasi = this.parseTemplate({ isTagged: !0 })),
          (e = this.finishNode(d, 'TaggedTemplateExpression'))
      }
      return e
    }),
    (kh.parseExprAtom = function (e) {
      this.type === Xo.slash && this.readRegexp()
      var t,
        s = this.potentialArrowAt === this.start
      switch (this.type) {
        case Xo._super:
          return (
            this.allowSuper || this.raise(this.start, "'super' keyword outside a method"),
            (t = this.startNode()),
            this.next(),
            this.type !== Xo.parenL ||
              this.allowDirectSuper ||
              this.raise(t.start, 'super() call outside constructor of a subclass'),
            this.type !== Xo.dot &&
              this.type !== Xo.bracketL &&
              this.type !== Xo.parenL &&
              this.unexpected(),
            this.finishNode(t, 'Super')
          )
        case Xo._this:
          return (t = this.startNode()), this.next(), this.finishNode(t, 'ThisExpression')
        case Xo.name:
          var i = this.start,
            n = this.startLoc,
            r = this.containsEsc,
            a = this.parseIdent(!1)
          if (
            this.options.ecmaVersion >= 8 &&
            !r &&
            'async' === a.name &&
            !this.canInsertSemicolon() &&
            this.eat(Xo._function)
          )
            return this.parseFunction(this.startNodeAt(i, n), 0, !1, !0)
          if (s && !this.canInsertSemicolon()) {
            if (this.eat(Xo.arrow))
              return this.parseArrowExpression(this.startNodeAt(i, n), [a], !1)
            if (this.options.ecmaVersion >= 8 && 'async' === a.name && this.type === Xo.name && !r)
              return (
                (a = this.parseIdent(!1)),
                (!this.canInsertSemicolon() && this.eat(Xo.arrow)) || this.unexpected(),
                this.parseArrowExpression(this.startNodeAt(i, n), [a], !0)
              )
          }
          return a
        case Xo.regexp:
          var o = this.value
          return (
            ((t = this.parseLiteral(o.value)).regex = { pattern: o.pattern, flags: o.flags }), t
          )
        case Xo.num:
        case Xo.string:
          return this.parseLiteral(this.value)
        case Xo._null:
        case Xo._true:
        case Xo._false:
          return (
            ((t = this.startNode()).value = this.type === Xo._null ? null : this.type === Xo._true),
            (t.raw = this.type.keyword),
            this.next(),
            this.finishNode(t, 'Literal')
          )
        case Xo.parenL:
          var h = this.start,
            l = this.parseParenAndDistinguishExpression(s)
          return (
            e &&
              (e.parenthesizedAssign < 0 &&
                !this.isSimpleAssignTarget(l) &&
                (e.parenthesizedAssign = h),
              e.parenthesizedBind < 0 && (e.parenthesizedBind = h)),
            l
          )
        case Xo.bracketL:
          return (
            (t = this.startNode()),
            this.next(),
            (t.elements = this.parseExprList(Xo.bracketR, !0, !0, e)),
            this.finishNode(t, 'ArrayExpression')
          )
        case Xo.braceL:
          return this.parseObj(!1, e)
        case Xo._function:
          return (t = this.startNode()), this.next(), this.parseFunction(t, 0)
        case Xo._class:
          return this.parseClass(this.startNode(), !1)
        case Xo._new:
          return this.parseNew()
        case Xo.backQuote:
          return this.parseTemplate()
        case Xo._import:
          return this.options.ecmaVersion >= 11 ? this.parseExprImport() : this.unexpected()
        default:
          this.unexpected()
      }
    }),
    (kh.parseExprImport = function () {
      var e = this.startNode()
      switch ((this.next(), this.type)) {
        case Xo.parenL:
          return this.parseDynamicImport(e)
        default:
          this.unexpected()
      }
    }),
    (kh.parseDynamicImport = function (e) {
      if ((this.next(), (e.source = this.parseMaybeAssign()), !this.eat(Xo.parenR))) {
        var t = this.start
        this.eat(Xo.comma) && this.eat(Xo.parenR)
          ? this.raiseRecoverable(t, 'Trailing comma is not allowed in import()')
          : this.unexpected(t)
      }
      return this.finishNode(e, 'ImportExpression')
    }),
    (kh.parseLiteral = function (e) {
      var t = this.startNode()
      return (
        (t.value = e),
        (t.raw = this.input.slice(this.start, this.end)),
        110 === t.raw.charCodeAt(t.raw.length - 1) && (t.bigint = t.raw.slice(0, -1)),
        this.next(),
        this.finishNode(t, 'Literal')
      )
    }),
    (kh.parseParenExpression = function () {
      this.expect(Xo.parenL)
      var e = this.parseExpression()
      return this.expect(Xo.parenR), e
    }),
    (kh.parseParenAndDistinguishExpression = function (e) {
      var t,
        s = this.start,
        i = this.startLoc,
        n = this.options.ecmaVersion >= 8
      if (this.options.ecmaVersion >= 6) {
        this.next()
        var r,
          a = this.start,
          o = this.startLoc,
          h = [],
          l = !0,
          c = !1,
          u = new yh(),
          p = this.yieldPos,
          d = this.awaitPos
        for (this.yieldPos = 0, this.awaitPos = 0; this.type !== Xo.parenR; ) {
          if ((l ? (l = !1) : this.expect(Xo.comma), n && this.afterTrailingComma(Xo.parenR, !0))) {
            c = !0
            break
          }
          if (this.type === Xo.ellipsis) {
            ;(r = this.start),
              h.push(this.parseParenItem(this.parseRestBinding())),
              this.type === Xo.comma &&
                this.raise(this.start, 'Comma is not permitted after the rest element')
            break
          }
          h.push(this.parseMaybeAssign(!1, u, this.parseParenItem))
        }
        var f = this.start,
          m = this.startLoc
        if ((this.expect(Xo.parenR), e && !this.canInsertSemicolon() && this.eat(Xo.arrow)))
          return (
            this.checkPatternErrors(u, !1),
            this.checkYieldAwaitInDefaultParams(),
            (this.yieldPos = p),
            (this.awaitPos = d),
            this.parseParenArrowList(s, i, h)
          )
        ;(h.length && !c) || this.unexpected(this.lastTokStart),
          r && this.unexpected(r),
          this.checkExpressionErrors(u, !0),
          (this.yieldPos = p || this.yieldPos),
          (this.awaitPos = d || this.awaitPos),
          h.length > 1
            ? (((t = this.startNodeAt(a, o)).expressions = h),
              this.finishNodeAt(t, 'SequenceExpression', f, m))
            : (t = h[0])
      } else t = this.parseParenExpression()
      if (this.options.preserveParens) {
        var g = this.startNodeAt(s, i)
        return (g.expression = t), this.finishNode(g, 'ParenthesizedExpression')
      }
      return t
    }),
    (kh.parseParenItem = function (e) {
      return e
    }),
    (kh.parseParenArrowList = function (e, t, s) {
      return this.parseArrowExpression(this.startNodeAt(e, t), s)
    })
  var Ch = []
  ;(kh.parseNew = function () {
    this.containsEsc && this.raiseRecoverable(this.start, 'Escape sequence in keyword new')
    var e = this.startNode(),
      t = this.parseIdent(!0)
    if (this.options.ecmaVersion >= 6 && this.eat(Xo.dot)) {
      e.meta = t
      var s = this.containsEsc
      return (
        (e.property = this.parseIdent(!0)),
        ('target' !== e.property.name || s) &&
          this.raiseRecoverable(
            e.property.start,
            'The only valid meta property for new is new.target'
          ),
        this.inNonArrowFunction() ||
          this.raiseRecoverable(e.start, 'new.target can only be used in functions'),
        this.finishNode(e, 'MetaProperty')
      )
    }
    var i = this.start,
      n = this.startLoc,
      r = this.type === Xo._import
    return (
      (e.callee = this.parseSubscripts(this.parseExprAtom(), i, n, !0)),
      r && 'ImportExpression' === e.callee.type && this.raise(i, 'Cannot use new with import()'),
      this.eat(Xo.parenL)
        ? (e.arguments = this.parseExprList(Xo.parenR, this.options.ecmaVersion >= 8, !1))
        : (e.arguments = Ch),
      this.finishNode(e, 'NewExpression')
    )
  }),
    (kh.parseTemplateElement = function (e) {
      var t = e.isTagged,
        s = this.startNode()
      return (
        this.type === Xo.invalidTemplate
          ? (t ||
              this.raiseRecoverable(this.start, 'Bad escape sequence in untagged template literal'),
            (s.value = { raw: this.value, cooked: null }))
          : (s.value = {
              raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, '\n'),
              cooked: this.value
            }),
        this.next(),
        (s.tail = this.type === Xo.backQuote),
        this.finishNode(s, 'TemplateElement')
      )
    }),
    (kh.parseTemplate = function (e) {
      void 0 === e && (e = {})
      var t = e.isTagged
      void 0 === t && (t = !1)
      var s = this.startNode()
      this.next(), (s.expressions = [])
      var i = this.parseTemplateElement({ isTagged: t })
      for (s.quasis = [i]; !i.tail; )
        this.type === Xo.eof && this.raise(this.pos, 'Unterminated template literal'),
          this.expect(Xo.dollarBraceL),
          s.expressions.push(this.parseExpression()),
          this.expect(Xo.braceR),
          s.quasis.push((i = this.parseTemplateElement({ isTagged: t })))
      return this.next(), this.finishNode(s, 'TemplateLiteral')
    }),
    (kh.isAsyncProp = function (e) {
      return (
        !e.computed &&
        'Identifier' === e.key.type &&
        'async' === e.key.name &&
        (this.type === Xo.name ||
          this.type === Xo.num ||
          this.type === Xo.string ||
          this.type === Xo.bracketL ||
          this.type.keyword ||
          (this.options.ecmaVersion >= 9 && this.type === Xo.star)) &&
        !Yo.test(this.input.slice(this.lastTokEnd, this.start))
      )
    }),
    (kh.parseObj = function (e, t) {
      var s = this.startNode(),
        i = !0,
        n = {}
      for (s.properties = [], this.next(); !this.eat(Xo.braceR); ) {
        if (i) i = !1
        else if (
          (this.expect(Xo.comma),
          this.options.ecmaVersion >= 5 && this.afterTrailingComma(Xo.braceR))
        )
          break
        var r = this.parseProperty(e, t)
        e || this.checkPropClash(r, n, t), s.properties.push(r)
      }
      return this.finishNode(s, e ? 'ObjectPattern' : 'ObjectExpression')
    }),
    (kh.parseProperty = function (e, t) {
      var s,
        i,
        n,
        r,
        a = this.startNode()
      if (this.options.ecmaVersion >= 9 && this.eat(Xo.ellipsis))
        return e
          ? ((a.argument = this.parseIdent(!1)),
            this.type === Xo.comma &&
              this.raise(this.start, 'Comma is not permitted after the rest element'),
            this.finishNode(a, 'RestElement'))
          : (this.type === Xo.parenL &&
              t &&
              (t.parenthesizedAssign < 0 && (t.parenthesizedAssign = this.start),
              t.parenthesizedBind < 0 && (t.parenthesizedBind = this.start)),
            (a.argument = this.parseMaybeAssign(!1, t)),
            this.type === Xo.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start),
            this.finishNode(a, 'SpreadElement'))
      this.options.ecmaVersion >= 6 &&
        ((a.method = !1),
        (a.shorthand = !1),
        (e || t) && ((n = this.start), (r = this.startLoc)),
        e || (s = this.eat(Xo.star)))
      var o = this.containsEsc
      return (
        this.parsePropertyName(a),
        !e && !o && this.options.ecmaVersion >= 8 && !s && this.isAsyncProp(a)
          ? ((i = !0),
            (s = this.options.ecmaVersion >= 9 && this.eat(Xo.star)),
            this.parsePropertyName(a, t))
          : (i = !1),
        this.parsePropertyValue(a, e, s, i, n, r, t, o),
        this.finishNode(a, 'Property')
      )
    }),
    (kh.parsePropertyValue = function (e, t, s, i, n, r, a, o) {
      if (((s || i) && this.type === Xo.colon && this.unexpected(), this.eat(Xo.colon)))
        (e.value = t
          ? this.parseMaybeDefault(this.start, this.startLoc)
          : this.parseMaybeAssign(!1, a)),
          (e.kind = 'init')
      else if (this.options.ecmaVersion >= 6 && this.type === Xo.parenL)
        t && this.unexpected(),
          (e.kind = 'init'),
          (e.method = !0),
          (e.value = this.parseMethod(s, i))
      else if (
        t ||
        o ||
        !(this.options.ecmaVersion >= 5) ||
        e.computed ||
        'Identifier' !== e.key.type ||
        ('get' !== e.key.name && 'set' !== e.key.name) ||
        this.type === Xo.comma ||
        this.type === Xo.braceR
      )
        this.options.ecmaVersion >= 6 && !e.computed && 'Identifier' === e.key.type
          ? ((s || i) && this.unexpected(),
            this.checkUnreserved(e.key),
            'await' !== e.key.name || this.awaitIdentPos || (this.awaitIdentPos = n),
            (e.kind = 'init'),
            t
              ? (e.value = this.parseMaybeDefault(n, r, e.key))
              : this.type === Xo.eq && a
                ? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start),
                  (e.value = this.parseMaybeDefault(n, r, e.key)))
                : (e.value = e.key),
            (e.shorthand = !0))
          : this.unexpected()
      else {
        ;(s || i) && this.unexpected(),
          (e.kind = e.key.name),
          this.parsePropertyName(e),
          (e.value = this.parseMethod(!1))
        var h = 'get' === e.kind ? 0 : 1
        if (e.value.params.length !== h) {
          var l = e.value.start
          'get' === e.kind
            ? this.raiseRecoverable(l, 'getter should have no params')
            : this.raiseRecoverable(l, 'setter should have exactly one param')
        } else
          'set' === e.kind &&
            'RestElement' === e.value.params[0].type &&
            this.raiseRecoverable(e.value.params[0].start, 'Setter cannot use rest params')
      }
    }),
    (kh.parsePropertyName = function (e) {
      if (this.options.ecmaVersion >= 6) {
        if (this.eat(Xo.bracketL))
          return (
            (e.computed = !0), (e.key = this.parseMaybeAssign()), this.expect(Xo.bracketR), e.key
          )
        e.computed = !1
      }
      return (e.key =
        this.type === Xo.num || this.type === Xo.string
          ? this.parseExprAtom()
          : this.parseIdent('never' !== this.options.allowReserved))
    }),
    (kh.initFunction = function (e) {
      ;(e.id = null),
        this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1),
        this.options.ecmaVersion >= 8 && (e.async = !1)
    }),
    (kh.parseMethod = function (e, t, s) {
      var i = this.startNode(),
        n = this.yieldPos,
        r = this.awaitPos,
        a = this.awaitIdentPos
      return (
        this.initFunction(i),
        this.options.ecmaVersion >= 6 && (i.generator = e),
        this.options.ecmaVersion >= 8 && (i.async = !!t),
        (this.yieldPos = 0),
        (this.awaitPos = 0),
        (this.awaitIdentPos = 0),
        this.enterScope(64 | ph(t, i.generator) | (s ? 128 : 0)),
        this.expect(Xo.parenL),
        (i.params = this.parseBindingList(Xo.parenR, !1, this.options.ecmaVersion >= 8)),
        this.checkYieldAwaitInDefaultParams(),
        this.parseFunctionBody(i, !1, !0),
        (this.yieldPos = n),
        (this.awaitPos = r),
        (this.awaitIdentPos = a),
        this.finishNode(i, 'FunctionExpression')
      )
    }),
    (kh.parseArrowExpression = function (e, t, s) {
      var i = this.yieldPos,
        n = this.awaitPos,
        r = this.awaitIdentPos
      return (
        this.enterScope(16 | ph(s, !1)),
        this.initFunction(e),
        this.options.ecmaVersion >= 8 && (e.async = !!s),
        (this.yieldPos = 0),
        (this.awaitPos = 0),
        (this.awaitIdentPos = 0),
        (e.params = this.toAssignableList(t, !0)),
        this.parseFunctionBody(e, !0, !1),
        (this.yieldPos = i),
        (this.awaitPos = n),
        (this.awaitIdentPos = r),
        this.finishNode(e, 'ArrowFunctionExpression')
      )
    }),
    (kh.parseFunctionBody = function (e, t, s) {
      var i = t && this.type !== Xo.braceL,
        n = this.strict,
        r = !1
      if (i) (e.body = this.parseMaybeAssign()), (e.expression = !0), this.checkParams(e, !1)
      else {
        var a = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params)
        ;(n && !a) ||
          ((r = this.strictDirective(this.end)) &&
            a &&
            this.raiseRecoverable(
              e.start,
              "Illegal 'use strict' directive in function with non-simple parameter list"
            ))
        var o = this.labels
        ;(this.labels = []),
          r && (this.strict = !0),
          this.checkParams(e, !n && !r && !t && !s && this.isSimpleParamList(e.params)),
          (e.body = this.parseBlock(!1)),
          (e.expression = !1),
          this.adaptDirectivePrologue(e.body.body),
          (this.labels = o)
      }
      this.exitScope(), this.strict && e.id && this.checkLVal(e.id, 5), (this.strict = n)
    }),
    (kh.isSimpleParamList = function (e) {
      for (var t = 0, s = e; t < s.length; t += 1) {
        if ('Identifier' !== s[t].type) return !1
      }
      return !0
    }),
    (kh.checkParams = function (e, t) {
      for (var s = {}, i = 0, n = e.params; i < n.length; i += 1) {
        var r = n[i]
        this.checkLVal(r, 1, t ? null : s)
      }
    }),
    (kh.parseExprList = function (e, t, s, i) {
      for (var n = [], r = !0; !this.eat(e); ) {
        if (r) r = !1
        else if ((this.expect(Xo.comma), t && this.afterTrailingComma(e))) break
        var a = void 0
        s && this.type === Xo.comma
          ? (a = null)
          : this.type === Xo.ellipsis
            ? ((a = this.parseSpread(i)),
              i && this.type === Xo.comma && i.trailingComma < 0 && (i.trailingComma = this.start))
            : (a = this.parseMaybeAssign(!1, i)),
          n.push(a)
      }
      return n
    }),
    (kh.checkUnreserved = function (e) {
      var t = e.start,
        s = e.end,
        i = e.name
      ;(this.inGenerator &&
        'yield' === i &&
        this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"),
      this.inAsync &&
        'await' === i &&
        this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"),
      this.keywords.test(i) && this.raise(t, "Unexpected keyword '" + i + "'"),
      this.options.ecmaVersion < 6 && -1 !== this.input.slice(t, s).indexOf('\\')) ||
        ((this.strict ? this.reservedWordsStrict : this.reservedWords).test(i) &&
          (this.inAsync ||
            'await' !== i ||
            this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"),
          this.raiseRecoverable(t, "The keyword '" + i + "' is reserved")))
    }),
    (kh.parseIdent = function (e, t) {
      var s = this.startNode()
      return (
        this.type === Xo.name
          ? (s.name = this.value)
          : this.type.keyword
            ? ((s.name = this.type.keyword),
              ('class' !== s.name && 'function' !== s.name) ||
                (this.lastTokEnd === this.lastTokStart + 1 &&
                  46 === this.input.charCodeAt(this.lastTokStart)) ||
                this.context.pop())
            : this.unexpected(),
        this.next(!!e),
        this.finishNode(s, 'Identifier'),
        e ||
          (this.checkUnreserved(s),
          'await' !== s.name || this.awaitIdentPos || (this.awaitIdentPos = s.start)),
        s
      )
    }),
    (kh.parseYield = function (e) {
      this.yieldPos || (this.yieldPos = this.start)
      var t = this.startNode()
      return (
        this.next(),
        this.type === Xo.semi ||
        this.canInsertSemicolon() ||
        (this.type !== Xo.star && !this.type.startsExpr)
          ? ((t.delegate = !1), (t.argument = null))
          : ((t.delegate = this.eat(Xo.star)), (t.argument = this.parseMaybeAssign(e))),
        this.finishNode(t, 'YieldExpression')
      )
    }),
    (kh.parseAwait = function () {
      this.awaitPos || (this.awaitPos = this.start)
      var e = this.startNode()
      return (
        this.next(),
        (e.argument = this.parseMaybeUnary(null, !1)),
        this.finishNode(e, 'AwaitExpression')
      )
    })
  var wh = dh.prototype
  ;(wh.raise = function (e, t) {
    var s = lh(this.input, e)
    t += ' (' + s.line + ':' + s.column + ')'
    var i = new SyntaxError(t)
    throw ((i.pos = e), (i.loc = s), (i.raisedAt = this.pos), i)
  }),
    (wh.raiseRecoverable = wh.raise),
    (wh.curPosition = function () {
      if (this.options.locations) return new oh(this.curLine, this.pos - this.lineStart)
    })
  var Ph = dh.prototype,
    Ih = function (e) {
      ;(this.flags = e), (this.var = []), (this.lexical = []), (this.functions = [])
    }
  ;(Ph.enterScope = function (e) {
    this.scopeStack.push(new Ih(e))
  }),
    (Ph.exitScope = function () {
      this.scopeStack.pop()
    }),
    (Ph.treatFunctionsAsVarInScope = function (e) {
      return 2 & e.flags || (!this.inModule && 1 & e.flags)
    }),
    (Ph.declareName = function (e, t, s) {
      var i = !1
      if (2 === t) {
        var n = this.currentScope()
        ;(i = n.lexical.indexOf(e) > -1 || n.functions.indexOf(e) > -1 || n.var.indexOf(e) > -1),
          n.lexical.push(e),
          this.inModule && 1 & n.flags && delete this.undefinedExports[e]
      } else if (4 === t) {
        this.currentScope().lexical.push(e)
      } else if (3 === t) {
        var r = this.currentScope()
        ;(i = this.treatFunctionsAsVar
          ? r.lexical.indexOf(e) > -1
          : r.lexical.indexOf(e) > -1 || r.var.indexOf(e) > -1),
          r.functions.push(e)
      } else
        for (var a = this.scopeStack.length - 1; a >= 0; --a) {
          var o = this.scopeStack[a]
          if (
            (o.lexical.indexOf(e) > -1 && !(32 & o.flags && o.lexical[0] === e)) ||
            (!this.treatFunctionsAsVarInScope(o) && o.functions.indexOf(e) > -1)
          ) {
            i = !0
            break
          }
          if (
            (o.var.push(e),
            this.inModule && 1 & o.flags && delete this.undefinedExports[e],
            3 & o.flags)
          )
            break
        }
      i && this.raiseRecoverable(s, "Identifier '" + e + "' has already been declared")
    }),
    (Ph.checkLocalExport = function (e) {
      ;-1 === this.scopeStack[0].lexical.indexOf(e.name) &&
        -1 === this.scopeStack[0].var.indexOf(e.name) &&
        (this.undefinedExports[e.name] = e)
    }),
    (Ph.currentScope = function () {
      return this.scopeStack[this.scopeStack.length - 1]
    }),
    (Ph.currentVarScope = function () {
      for (var e = this.scopeStack.length - 1; ; e--) {
        var t = this.scopeStack[e]
        if (3 & t.flags) return t
      }
    }),
    (Ph.currentThisScope = function () {
      for (var e = this.scopeStack.length - 1; ; e--) {
        var t = this.scopeStack[e]
        if (3 & t.flags && !(16 & t.flags)) return t
      }
    })
  var Nh = function (e, t, s) {
      ;(this.type = ''),
        (this.start = t),
        (this.end = 0),
        e.options.locations && (this.loc = new hh(e, s)),
        e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile),
        e.options.ranges && (this.range = [t, 0])
    },
    Th = dh.prototype
  function Lh(e, t, s, i) {
    return (
      (e.type = t),
      (e.end = s),
      this.options.locations && (e.loc.end = i),
      this.options.ranges && (e.range[1] = s),
      e
    )
  }
  ;(Th.startNode = function () {
    return new Nh(this, this.start, this.startLoc)
  }),
    (Th.startNodeAt = function (e, t) {
      return new Nh(this, e, t)
    }),
    (Th.finishNode = function (e, t) {
      return Lh.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc)
    }),
    (Th.finishNodeAt = function (e, t, s, i) {
      return Lh.call(this, e, t, s, i)
    })
  var Mh = function (e, t, s, i, n) {
      ;(this.token = e),
        (this.isExpr = !!t),
        (this.preserveSpace = !!s),
        (this.override = i),
        (this.generator = !!n)
    },
    Rh = {
      b_stat: new Mh('{', !1),
      b_expr: new Mh('{', !0),
      b_tmpl: new Mh('${', !1),
      p_stat: new Mh('(', !1),
      p_expr: new Mh('(', !0),
      q_tmpl: new Mh('`', !0, !0, function (e) {
        return e.tryReadTemplateToken()
      }),
      f_stat: new Mh('function', !1),
      f_expr: new Mh('function', !0),
      f_expr_gen: new Mh('function', !0, !1, null, !0),
      f_gen: new Mh('function', !1, !1, null, !0)
    },
    $h = dh.prototype
  ;($h.initialContext = function () {
    return [Rh.b_stat]
  }),
    ($h.braceIsBlock = function (e) {
      var t = this.curContext()
      return (
        t === Rh.f_expr ||
        t === Rh.f_stat ||
        (e !== Xo.colon || (t !== Rh.b_stat && t !== Rh.b_expr)
          ? e === Xo._return || (e === Xo.name && this.exprAllowed)
            ? Yo.test(this.input.slice(this.lastTokEnd, this.start))
            : e === Xo._else ||
              e === Xo.semi ||
              e === Xo.eof ||
              e === Xo.parenR ||
              e === Xo.arrow ||
              (e === Xo.braceL
                ? t === Rh.b_stat
                : e !== Xo._var && e !== Xo._const && e !== Xo.name && !this.exprAllowed)
          : !t.isExpr)
      )
    }),
    ($h.inGeneratorContext = function () {
      for (var e = this.context.length - 1; e >= 1; e--) {
        var t = this.context[e]
        if ('function' === t.token) return t.generator
      }
      return !1
    }),
    ($h.updateContext = function (e) {
      var t,
        s = this.type
      s.keyword && e === Xo.dot
        ? (this.exprAllowed = !1)
        : (t = s.updateContext)
          ? t.call(this, e)
          : (this.exprAllowed = s.beforeExpr)
    }),
    (Xo.parenR.updateContext = Xo.braceR.updateContext =
      function () {
        if (1 !== this.context.length) {
          var e = this.context.pop()
          e === Rh.b_stat && 'function' === this.curContext().token && (e = this.context.pop()),
            (this.exprAllowed = !e.isExpr)
        } else this.exprAllowed = !0
      }),
    (Xo.braceL.updateContext = function (e) {
      this.context.push(this.braceIsBlock(e) ? Rh.b_stat : Rh.b_expr), (this.exprAllowed = !0)
    }),
    (Xo.dollarBraceL.updateContext = function () {
      this.context.push(Rh.b_tmpl), (this.exprAllowed = !0)
    }),
    (Xo.parenL.updateContext = function (e) {
      var t = e === Xo._if || e === Xo._for || e === Xo._with || e === Xo._while
      this.context.push(t ? Rh.p_stat : Rh.p_expr), (this.exprAllowed = !0)
    }),
    (Xo.incDec.updateContext = function () {}),
    (Xo._function.updateContext = Xo._class.updateContext =
      function (e) {
        !e.beforeExpr ||
        e === Xo.semi ||
        e === Xo._else ||
        (e === Xo._return && Yo.test(this.input.slice(this.lastTokEnd, this.start))) ||
        ((e === Xo.colon || e === Xo.braceL) && this.curContext() === Rh.b_stat)
          ? this.context.push(Rh.f_stat)
          : this.context.push(Rh.f_expr),
          (this.exprAllowed = !1)
      }),
    (Xo.backQuote.updateContext = function () {
      this.curContext() === Rh.q_tmpl ? this.context.pop() : this.context.push(Rh.q_tmpl),
        (this.exprAllowed = !1)
    }),
    (Xo.star.updateContext = function (e) {
      if (e === Xo._function) {
        var t = this.context.length - 1
        this.context[t] === Rh.f_expr
          ? (this.context[t] = Rh.f_expr_gen)
          : (this.context[t] = Rh.f_gen)
      }
      this.exprAllowed = !0
    }),
    (Xo.name.updateContext = function (e) {
      var t = !1
      this.options.ecmaVersion >= 6 &&
        e !== Xo.dot &&
        (('of' === this.value && !this.exprAllowed) ||
          ('yield' === this.value && this.inGeneratorContext())) &&
        (t = !0),
        (this.exprAllowed = t)
    })
  var Oh =
      'ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS',
    Vh = Oh + ' Extended_Pictographic',
    Dh = {
      9: Oh,
      10: Vh,
      11: 'ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS Extended_Pictographic'
    },
    Bh =
      'Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu',
    Fh =
      'Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb',
    Wh =
      Fh +
      ' Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd',
    Uh = {
      9: Fh,
      10: Wh,
      11: 'Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho'
    },
    jh = {}
  function zh(e) {
    var t = (jh[e] = {
      binary: ah(Dh[e] + ' ' + Bh),
      nonBinary: { General_Category: ah(Bh), Script: ah(Uh[e]) }
    })
    ;(t.nonBinary.Script_Extensions = t.nonBinary.Script),
      (t.nonBinary.gc = t.nonBinary.General_Category),
      (t.nonBinary.sc = t.nonBinary.Script),
      (t.nonBinary.scx = t.nonBinary.Script_Extensions)
  }
  zh(9), zh(10), zh(11)
  var Gh = dh.prototype,
    Hh = function (e) {
      ;(this.parser = e),
        (this.validFlags =
          'gim' +
          (e.options.ecmaVersion >= 6 ? 'uy' : '') +
          (e.options.ecmaVersion >= 9 ? 's' : '')),
        (this.unicodeProperties = jh[e.options.ecmaVersion >= 11 ? 11 : e.options.ecmaVersion]),
        (this.source = ''),
        (this.flags = ''),
        (this.start = 0),
        (this.switchU = !1),
        (this.switchN = !1),
        (this.pos = 0),
        (this.lastIntValue = 0),
        (this.lastStringValue = ''),
        (this.lastAssertionIsQuantifiable = !1),
        (this.numCapturingParens = 0),
        (this.maxBackReference = 0),
        (this.groupNames = []),
        (this.backReferenceNames = [])
    }
  function qh(e) {
    return e <= 65535
      ? String.fromCharCode(e)
      : ((e -= 65536), String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)))
  }
  function Kh(e) {
    return (
      36 === e ||
      (e >= 40 && e <= 43) ||
      46 === e ||
      63 === e ||
      (e >= 91 && e <= 94) ||
      (e >= 123 && e <= 125)
    )
  }
  function Xh(e) {
    return (e >= 65 && e <= 90) || (e >= 97 && e <= 122)
  }
  function Yh(e) {
    return Xh(e) || 95 === e
  }
  function Qh(e) {
    return Yh(e) || Jh(e)
  }
  function Jh(e) {
    return e >= 48 && e <= 57
  }
  function Zh(e) {
    return (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102)
  }
  function el(e) {
    return e >= 65 && e <= 70 ? e - 65 + 10 : e >= 97 && e <= 102 ? e - 97 + 10 : e - 48
  }
  function tl(e) {
    return e >= 48 && e <= 55
  }
  ;(Hh.prototype.reset = function (e, t, s) {
    var i = -1 !== s.indexOf('u')
    ;(this.start = 0 | e),
      (this.source = t + ''),
      (this.flags = s),
      (this.switchU = i && this.parser.options.ecmaVersion >= 6),
      (this.switchN = i && this.parser.options.ecmaVersion >= 9)
  }),
    (Hh.prototype.raise = function (e) {
      this.parser.raiseRecoverable(
        this.start,
        'Invalid regular expression: /' + this.source + '/: ' + e
      )
    }),
    (Hh.prototype.at = function (e) {
      var t = this.source,
        s = t.length
      if (e >= s) return -1
      var i = t.charCodeAt(e)
      if (!this.switchU || i <= 55295 || i >= 57344 || e + 1 >= s) return i
      var n = t.charCodeAt(e + 1)
      return n >= 56320 && n <= 57343 ? (i << 10) + n - 56613888 : i
    }),
    (Hh.prototype.nextIndex = function (e) {
      var t = this.source,
        s = t.length
      if (e >= s) return s
      var i,
        n = t.charCodeAt(e)
      return !this.switchU ||
        n <= 55295 ||
        n >= 57344 ||
        e + 1 >= s ||
        (i = t.charCodeAt(e + 1)) < 56320 ||
        i > 57343
        ? e + 1
        : e + 2
    }),
    (Hh.prototype.current = function () {
      return this.at(this.pos)
    }),
    (Hh.prototype.lookahead = function () {
      return this.at(this.nextIndex(this.pos))
    }),
    (Hh.prototype.advance = function () {
      this.pos = this.nextIndex(this.pos)
    }),
    (Hh.prototype.eat = function (e) {
      return this.current() === e && (this.advance(), !0)
    }),
    (Gh.validateRegExpFlags = function (e) {
      for (var t = e.validFlags, s = e.flags, i = 0; i < s.length; i++) {
        var n = s.charAt(i)
        ;-1 === t.indexOf(n) && this.raise(e.start, 'Invalid regular expression flag'),
          s.indexOf(n, i + 1) > -1 && this.raise(e.start, 'Duplicate regular expression flag')
      }
    }),
    (Gh.validateRegExpPattern = function (e) {
      this.regexp_pattern(e),
        !e.switchN &&
          this.options.ecmaVersion >= 9 &&
          e.groupNames.length > 0 &&
          ((e.switchN = !0), this.regexp_pattern(e))
    }),
    (Gh.regexp_pattern = function (e) {
      ;(e.pos = 0),
        (e.lastIntValue = 0),
        (e.lastStringValue = ''),
        (e.lastAssertionIsQuantifiable = !1),
        (e.numCapturingParens = 0),
        (e.maxBackReference = 0),
        (e.groupNames.length = 0),
        (e.backReferenceNames.length = 0),
        this.regexp_disjunction(e),
        e.pos !== e.source.length &&
          (e.eat(41) && e.raise("Unmatched ')'"),
          (e.eat(93) || e.eat(125)) && e.raise('Lone quantifier brackets')),
        e.maxBackReference > e.numCapturingParens && e.raise('Invalid escape')
      for (var t = 0, s = e.backReferenceNames; t < s.length; t += 1) {
        var i = s[t]
        ;-1 === e.groupNames.indexOf(i) && e.raise('Invalid named capture referenced')
      }
    }),
    (Gh.regexp_disjunction = function (e) {
      for (this.regexp_alternative(e); e.eat(124); ) this.regexp_alternative(e)
      this.regexp_eatQuantifier(e, !0) && e.raise('Nothing to repeat'),
        e.eat(123) && e.raise('Lone quantifier brackets')
    }),
    (Gh.regexp_alternative = function (e) {
      for (; e.pos < e.source.length && this.regexp_eatTerm(e); );
    }),
    (Gh.regexp_eatTerm = function (e) {
      return this.regexp_eatAssertion(e)
        ? (e.lastAssertionIsQuantifiable &&
            this.regexp_eatQuantifier(e) &&
            e.switchU &&
            e.raise('Invalid quantifier'),
          !0)
        : !!(e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) &&
            (this.regexp_eatQuantifier(e), !0)
    }),
    (Gh.regexp_eatAssertion = function (e) {
      var t = e.pos
      if (((e.lastAssertionIsQuantifiable = !1), e.eat(94) || e.eat(36))) return !0
      if (e.eat(92)) {
        if (e.eat(66) || e.eat(98)) return !0
        e.pos = t
      }
      if (e.eat(40) && e.eat(63)) {
        var s = !1
        if ((this.options.ecmaVersion >= 9 && (s = e.eat(60)), e.eat(61) || e.eat(33)))
          return (
            this.regexp_disjunction(e),
            e.eat(41) || e.raise('Unterminated group'),
            (e.lastAssertionIsQuantifiable = !s),
            !0
          )
      }
      return (e.pos = t), !1
    }),
    (Gh.regexp_eatQuantifier = function (e, t) {
      return void 0 === t && (t = !1), !!this.regexp_eatQuantifierPrefix(e, t) && (e.eat(63), !0)
    }),
    (Gh.regexp_eatQuantifierPrefix = function (e, t) {
      return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t)
    }),
    (Gh.regexp_eatBracedQuantifier = function (e, t) {
      var s = e.pos
      if (e.eat(123)) {
        var i = 0,
          n = -1
        if (
          this.regexp_eatDecimalDigits(e) &&
          ((i = e.lastIntValue),
          e.eat(44) && this.regexp_eatDecimalDigits(e) && (n = e.lastIntValue),
          e.eat(125))
        )
          return -1 !== n && n < i && !t && e.raise('numbers out of order in {} quantifier'), !0
        e.switchU && !t && e.raise('Incomplete quantifier'), (e.pos = s)
      }
      return !1
    }),
    (Gh.regexp_eatAtom = function (e) {
      return (
        this.regexp_eatPatternCharacters(e) ||
        e.eat(46) ||
        this.regexp_eatReverseSolidusAtomEscape(e) ||
        this.regexp_eatCharacterClass(e) ||
        this.regexp_eatUncapturingGroup(e) ||
        this.regexp_eatCapturingGroup(e)
      )
    }),
    (Gh.regexp_eatReverseSolidusAtomEscape = function (e) {
      var t = e.pos
      if (e.eat(92)) {
        if (this.regexp_eatAtomEscape(e)) return !0
        e.pos = t
      }
      return !1
    }),
    (Gh.regexp_eatUncapturingGroup = function (e) {
      var t = e.pos
      if (e.eat(40)) {
        if (e.eat(63) && e.eat(58)) {
          if ((this.regexp_disjunction(e), e.eat(41))) return !0
          e.raise('Unterminated group')
        }
        e.pos = t
      }
      return !1
    }),
    (Gh.regexp_eatCapturingGroup = function (e) {
      if (e.eat(40)) {
        if (
          (this.options.ecmaVersion >= 9
            ? this.regexp_groupSpecifier(e)
            : 63 === e.current() && e.raise('Invalid group'),
          this.regexp_disjunction(e),
          e.eat(41))
        )
          return (e.numCapturingParens += 1), !0
        e.raise('Unterminated group')
      }
      return !1
    }),
    (Gh.regexp_eatExtendedAtom = function (e) {
      return (
        e.eat(46) ||
        this.regexp_eatReverseSolidusAtomEscape(e) ||
        this.regexp_eatCharacterClass(e) ||
        this.regexp_eatUncapturingGroup(e) ||
        this.regexp_eatCapturingGroup(e) ||
        this.regexp_eatInvalidBracedQuantifier(e) ||
        this.regexp_eatExtendedPatternCharacter(e)
      )
    }),
    (Gh.regexp_eatInvalidBracedQuantifier = function (e) {
      return this.regexp_eatBracedQuantifier(e, !0) && e.raise('Nothing to repeat'), !1
    }),
    (Gh.regexp_eatSyntaxCharacter = function (e) {
      var t = e.current()
      return !!Kh(t) && ((e.lastIntValue = t), e.advance(), !0)
    }),
    (Gh.regexp_eatPatternCharacters = function (e) {
      for (var t = e.pos, s = 0; -1 !== (s = e.current()) && !Kh(s); ) e.advance()
      return e.pos !== t
    }),
    (Gh.regexp_eatExtendedPatternCharacter = function (e) {
      var t = e.current()
      return (
        !(
          -1 === t ||
          36 === t ||
          (t >= 40 && t <= 43) ||
          46 === t ||
          63 === t ||
          91 === t ||
          94 === t ||
          124 === t
        ) && (e.advance(), !0)
      )
    }),
    (Gh.regexp_groupSpecifier = function (e) {
      if (e.eat(63)) {
        if (this.regexp_eatGroupName(e))
          return (
            -1 !== e.groupNames.indexOf(e.lastStringValue) &&
              e.raise('Duplicate capture group name'),
            void e.groupNames.push(e.lastStringValue)
          )
        e.raise('Invalid group')
      }
    }),
    (Gh.regexp_eatGroupName = function (e) {
      if (((e.lastStringValue = ''), e.eat(60))) {
        if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0
        e.raise('Invalid capture group name')
      }
      return !1
    }),
    (Gh.regexp_eatRegExpIdentifierName = function (e) {
      if (((e.lastStringValue = ''), this.regexp_eatRegExpIdentifierStart(e))) {
        for (e.lastStringValue += qh(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
          e.lastStringValue += qh(e.lastIntValue)
        return !0
      }
      return !1
    }),
    (Gh.regexp_eatRegExpIdentifierStart = function (e) {
      var t = e.pos,
        s = e.current()
      return (
        e.advance(),
        92 === s && this.regexp_eatRegExpUnicodeEscapeSequence(e) && (s = e.lastIntValue),
        (function (e) {
          return Wo(e, !0) || 36 === e || 95 === e
        })(s)
          ? ((e.lastIntValue = s), !0)
          : ((e.pos = t), !1)
      )
    }),
    (Gh.regexp_eatRegExpIdentifierPart = function (e) {
      var t = e.pos,
        s = e.current()
      return (
        e.advance(),
        92 === s && this.regexp_eatRegExpUnicodeEscapeSequence(e) && (s = e.lastIntValue),
        (function (e) {
          return Uo(e, !0) || 36 === e || 95 === e || 8204 === e || 8205 === e
        })(s)
          ? ((e.lastIntValue = s), !0)
          : ((e.pos = t), !1)
      )
    }),
    (Gh.regexp_eatAtomEscape = function (e) {
      return (
        !!(
          this.regexp_eatBackReference(e) ||
          this.regexp_eatCharacterClassEscape(e) ||
          this.regexp_eatCharacterEscape(e) ||
          (e.switchN && this.regexp_eatKGroupName(e))
        ) ||
        (e.switchU &&
          (99 === e.current() && e.raise('Invalid unicode escape'), e.raise('Invalid escape')),
        !1)
      )
    }),
    (Gh.regexp_eatBackReference = function (e) {
      var t = e.pos
      if (this.regexp_eatDecimalEscape(e)) {
        var s = e.lastIntValue
        if (e.switchU) return s > e.maxBackReference && (e.maxBackReference = s), !0
        if (s <= e.numCapturingParens) return !0
        e.pos = t
      }
      return !1
    }),
    (Gh.regexp_eatKGroupName = function (e) {
      if (e.eat(107)) {
        if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0
        e.raise('Invalid named reference')
      }
      return !1
    }),
    (Gh.regexp_eatCharacterEscape = function (e) {
      return (
        this.regexp_eatControlEscape(e) ||
        this.regexp_eatCControlLetter(e) ||
        this.regexp_eatZero(e) ||
        this.regexp_eatHexEscapeSequence(e) ||
        this.regexp_eatRegExpUnicodeEscapeSequence(e) ||
        (!e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e)) ||
        this.regexp_eatIdentityEscape(e)
      )
    }),
    (Gh.regexp_eatCControlLetter = function (e) {
      var t = e.pos
      if (e.eat(99)) {
        if (this.regexp_eatControlLetter(e)) return !0
        e.pos = t
      }
      return !1
    }),
    (Gh.regexp_eatZero = function (e) {
      return 48 === e.current() && !Jh(e.lookahead()) && ((e.lastIntValue = 0), e.advance(), !0)
    }),
    (Gh.regexp_eatControlEscape = function (e) {
      var t = e.current()
      return 116 === t
        ? ((e.lastIntValue = 9), e.advance(), !0)
        : 110 === t
          ? ((e.lastIntValue = 10), e.advance(), !0)
          : 118 === t
            ? ((e.lastIntValue = 11), e.advance(), !0)
            : 102 === t
              ? ((e.lastIntValue = 12), e.advance(), !0)
              : 114 === t && ((e.lastIntValue = 13), e.advance(), !0)
    }),
    (Gh.regexp_eatControlLetter = function (e) {
      var t = e.current()
      return !!Xh(t) && ((e.lastIntValue = t % 32), e.advance(), !0)
    }),
    (Gh.regexp_eatRegExpUnicodeEscapeSequence = function (e) {
      var t,
        s = e.pos
      if (e.eat(117)) {
        if (this.regexp_eatFixedHexDigits(e, 4)) {
          var i = e.lastIntValue
          if (e.switchU && i >= 55296 && i <= 56319) {
            var n = e.pos
            if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
              var r = e.lastIntValue
              if (r >= 56320 && r <= 57343)
                return (e.lastIntValue = 1024 * (i - 55296) + (r - 56320) + 65536), !0
            }
            ;(e.pos = n), (e.lastIntValue = i)
          }
          return !0
        }
        if (
          e.switchU &&
          e.eat(123) &&
          this.regexp_eatHexDigits(e) &&
          e.eat(125) &&
          (t = e.lastIntValue) >= 0 &&
          t <= 1114111
        )
          return !0
        e.switchU && e.raise('Invalid unicode escape'), (e.pos = s)
      }
      return !1
    }),
    (Gh.regexp_eatIdentityEscape = function (e) {
      if (e.switchU)
        return !!this.regexp_eatSyntaxCharacter(e) || (!!e.eat(47) && ((e.lastIntValue = 47), !0))
      var t = e.current()
      return !(99 === t || (e.switchN && 107 === t)) && ((e.lastIntValue = t), e.advance(), !0)
    }),
    (Gh.regexp_eatDecimalEscape = function (e) {
      e.lastIntValue = 0
      var t = e.current()
      if (t >= 49 && t <= 57) {
        do {
          ;(e.lastIntValue = 10 * e.lastIntValue + (t - 48)), e.advance()
        } while ((t = e.current()) >= 48 && t <= 57)
        return !0
      }
      return !1
    }),
    (Gh.regexp_eatCharacterClassEscape = function (e) {
      var t = e.current()
      if (
        (function (e) {
          return 100 === e || 68 === e || 115 === e || 83 === e || 119 === e || 87 === e
        })(t)
      )
        return (e.lastIntValue = -1), e.advance(), !0
      if (e.switchU && this.options.ecmaVersion >= 9 && (80 === t || 112 === t)) {
        if (
          ((e.lastIntValue = -1),
          e.advance(),
          e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(125))
        )
          return !0
        e.raise('Invalid property name')
      }
      return !1
    }),
    (Gh.regexp_eatUnicodePropertyValueExpression = function (e) {
      var t = e.pos
      if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
        var s = e.lastStringValue
        if (this.regexp_eatUnicodePropertyValue(e)) {
          var i = e.lastStringValue
          return this.regexp_validateUnicodePropertyNameAndValue(e, s, i), !0
        }
      }
      if (((e.pos = t), this.regexp_eatLoneUnicodePropertyNameOrValue(e))) {
        var n = e.lastStringValue
        return this.regexp_validateUnicodePropertyNameOrValue(e, n), !0
      }
      return !1
    }),
    (Gh.regexp_validateUnicodePropertyNameAndValue = function (e, t, s) {
      nh(e.unicodeProperties.nonBinary, t) || e.raise('Invalid property name'),
        e.unicodeProperties.nonBinary[t].test(s) || e.raise('Invalid property value')
    }),
    (Gh.regexp_validateUnicodePropertyNameOrValue = function (e, t) {
      e.unicodeProperties.binary.test(t) || e.raise('Invalid property name')
    }),
    (Gh.regexp_eatUnicodePropertyName = function (e) {
      var t = 0
      for (e.lastStringValue = ''; Yh((t = e.current())); )
        (e.lastStringValue += qh(t)), e.advance()
      return '' !== e.lastStringValue
    }),
    (Gh.regexp_eatUnicodePropertyValue = function (e) {
      var t = 0
      for (e.lastStringValue = ''; Qh((t = e.current())); )
        (e.lastStringValue += qh(t)), e.advance()
      return '' !== e.lastStringValue
    }),
    (Gh.regexp_eatLoneUnicodePropertyNameOrValue = function (e) {
      return this.regexp_eatUnicodePropertyValue(e)
    }),
    (Gh.regexp_eatCharacterClass = function (e) {
      if (e.eat(91)) {
        if ((e.eat(94), this.regexp_classRanges(e), e.eat(93))) return !0
        e.raise('Unterminated character class')
      }
      return !1
    }),
    (Gh.regexp_classRanges = function (e) {
      for (; this.regexp_eatClassAtom(e); ) {
        var t = e.lastIntValue
        if (e.eat(45) && this.regexp_eatClassAtom(e)) {
          var s = e.lastIntValue
          !e.switchU || (-1 !== t && -1 !== s) || e.raise('Invalid character class'),
            -1 !== t && -1 !== s && t > s && e.raise('Range out of order in character class')
        }
      }
    }),
    (Gh.regexp_eatClassAtom = function (e) {
      var t = e.pos
      if (e.eat(92)) {
        if (this.regexp_eatClassEscape(e)) return !0
        if (e.switchU) {
          var s = e.current()
          ;(99 === s || tl(s)) && e.raise('Invalid class escape'), e.raise('Invalid escape')
        }
        e.pos = t
      }
      var i = e.current()
      return 93 !== i && ((e.lastIntValue = i), e.advance(), !0)
    }),
    (Gh.regexp_eatClassEscape = function (e) {
      var t = e.pos
      if (e.eat(98)) return (e.lastIntValue = 8), !0
      if (e.switchU && e.eat(45)) return (e.lastIntValue = 45), !0
      if (!e.switchU && e.eat(99)) {
        if (this.regexp_eatClassControlLetter(e)) return !0
        e.pos = t
      }
      return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e)
    }),
    (Gh.regexp_eatClassControlLetter = function (e) {
      var t = e.current()
      return !(!Jh(t) && 95 !== t) && ((e.lastIntValue = t % 32), e.advance(), !0)
    }),
    (Gh.regexp_eatHexEscapeSequence = function (e) {
      var t = e.pos
      if (e.eat(120)) {
        if (this.regexp_eatFixedHexDigits(e, 2)) return !0
        e.switchU && e.raise('Invalid escape'), (e.pos = t)
      }
      return !1
    }),
    (Gh.regexp_eatDecimalDigits = function (e) {
      var t = e.pos,
        s = 0
      for (e.lastIntValue = 0; Jh((s = e.current())); )
        (e.lastIntValue = 10 * e.lastIntValue + (s - 48)), e.advance()
      return e.pos !== t
    }),
    (Gh.regexp_eatHexDigits = function (e) {
      var t = e.pos,
        s = 0
      for (e.lastIntValue = 0; Zh((s = e.current())); )
        (e.lastIntValue = 16 * e.lastIntValue + el(s)), e.advance()
      return e.pos !== t
    }),
    (Gh.regexp_eatLegacyOctalEscapeSequence = function (e) {
      if (this.regexp_eatOctalDigit(e)) {
        var t = e.lastIntValue
        if (this.regexp_eatOctalDigit(e)) {
          var s = e.lastIntValue
          t <= 3 && this.regexp_eatOctalDigit(e)
            ? (e.lastIntValue = 64 * t + 8 * s + e.lastIntValue)
            : (e.lastIntValue = 8 * t + s)
        } else e.lastIntValue = t
        return !0
      }
      return !1
    }),
    (Gh.regexp_eatOctalDigit = function (e) {
      var t = e.current()
      return tl(t) ? ((e.lastIntValue = t - 48), e.advance(), !0) : ((e.lastIntValue = 0), !1)
    }),
    (Gh.regexp_eatFixedHexDigits = function (e, t) {
      var s = e.pos
      e.lastIntValue = 0
      for (var i = 0; i < t; ++i) {
        var n = e.current()
        if (!Zh(n)) return (e.pos = s), !1
        ;(e.lastIntValue = 16 * e.lastIntValue + el(n)), e.advance()
      }
      return !0
    })
  var sl = function (e) {
      ;(this.type = e.type),
        (this.value = e.value),
        (this.start = e.start),
        (this.end = e.end),
        e.options.locations && (this.loc = new hh(e, e.startLoc, e.endLoc)),
        e.options.ranges && (this.range = [e.start, e.end])
    },
    il = dh.prototype
  function nl(e) {
    return e <= 65535
      ? String.fromCharCode(e)
      : ((e -= 65536), String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)))
  }
  ;(il.next = function (e) {
    !e &&
      this.type.keyword &&
      this.containsEsc &&
      this.raiseRecoverable(this.start, 'Escape sequence in keyword ' + this.type.keyword),
      this.options.onToken && this.options.onToken(new sl(this)),
      (this.lastTokEnd = this.end),
      (this.lastTokStart = this.start),
      (this.lastTokEndLoc = this.endLoc),
      (this.lastTokStartLoc = this.startLoc),
      this.nextToken()
  }),
    (il.getToken = function () {
      return this.next(), new sl(this)
    }),
    'undefined' != typeof Symbol &&
      (il[Symbol.iterator] = function () {
        var e = this
        return {
          next: function () {
            var t = e.getToken()
            return { done: t.type === Xo.eof, value: t }
          }
        }
      }),
    (il.curContext = function () {
      return this.context[this.context.length - 1]
    }),
    (il.nextToken = function () {
      var e = this.curContext()
      return (
        (e && e.preserveSpace) || this.skipSpace(),
        (this.start = this.pos),
        this.options.locations && (this.startLoc = this.curPosition()),
        this.pos >= this.input.length
          ? this.finishToken(Xo.eof)
          : e.override
            ? e.override(this)
            : void this.readToken(this.fullCharCodeAtPos())
      )
    }),
    (il.readToken = function (e) {
      return Wo(e, this.options.ecmaVersion >= 6) || 92 === e
        ? this.readWord()
        : this.getTokenFromCode(e)
    }),
    (il.fullCharCodeAtPos = function () {
      var e = this.input.charCodeAt(this.pos)
      return e <= 55295 || e >= 57344
        ? e
        : (e << 10) + this.input.charCodeAt(this.pos + 1) - 56613888
    }),
    (il.skipBlockComment = function () {
      var e,
        t = this.options.onComment && this.curPosition(),
        s = this.pos,
        i = this.input.indexOf('*/', (this.pos += 2))
      if (
        (-1 === i && this.raise(this.pos - 2, 'Unterminated comment'),
        (this.pos = i + 2),
        this.options.locations)
      )
        for (Qo.lastIndex = s; (e = Qo.exec(this.input)) && e.index < this.pos; )
          ++this.curLine, (this.lineStart = e.index + e[0].length)
      this.options.onComment &&
        this.options.onComment(!0, this.input.slice(s + 2, i), s, this.pos, t, this.curPosition())
    }),
    (il.skipLineComment = function (e) {
      for (
        var t = this.pos,
          s = this.options.onComment && this.curPosition(),
          i = this.input.charCodeAt((this.pos += e));
        this.pos < this.input.length && !Jo(i);

      )
        i = this.input.charCodeAt(++this.pos)
      this.options.onComment &&
        this.options.onComment(
          !1,
          this.input.slice(t + e, this.pos),
          t,
          this.pos,
          s,
          this.curPosition()
        )
    }),
    (il.skipSpace = function () {
      e: for (; this.pos < this.input.length; ) {
        var e = this.input.charCodeAt(this.pos)
        switch (e) {
          case 32:
          case 160:
            ++this.pos
            break
          case 13:
            10 === this.input.charCodeAt(this.pos + 1) && ++this.pos
          case 10:
          case 8232:
          case 8233:
            ++this.pos, this.options.locations && (++this.curLine, (this.lineStart = this.pos))
            break
          case 47:
            switch (this.input.charCodeAt(this.pos + 1)) {
              case 42:
                this.skipBlockComment()
                break
              case 47:
                this.skipLineComment(2)
                break
              default:
                break e
            }
            break
          default:
            if (!((e > 8 && e < 14) || (e >= 5760 && Zo.test(String.fromCharCode(e))))) break e
            ++this.pos
        }
      }
    }),
    (il.finishToken = function (e, t) {
      ;(this.end = this.pos), this.options.locations && (this.endLoc = this.curPosition())
      var s = this.type
      ;(this.type = e), (this.value = t), this.updateContext(s)
    }),
    (il.readToken_dot = function () {
      var e = this.input.charCodeAt(this.pos + 1)
      if (e >= 48 && e <= 57) return this.readNumber(!0)
      var t = this.input.charCodeAt(this.pos + 2)
      return this.options.ecmaVersion >= 6 && 46 === e && 46 === t
        ? ((this.pos += 3), this.finishToken(Xo.ellipsis))
        : (++this.pos, this.finishToken(Xo.dot))
    }),
    (il.readToken_slash = function () {
      var e = this.input.charCodeAt(this.pos + 1)
      return this.exprAllowed
        ? (++this.pos, this.readRegexp())
        : 61 === e
          ? this.finishOp(Xo.assign, 2)
          : this.finishOp(Xo.slash, 1)
    }),
    (il.readToken_mult_modulo_exp = function (e) {
      var t = this.input.charCodeAt(this.pos + 1),
        s = 1,
        i = 42 === e ? Xo.star : Xo.modulo
      return (
        this.options.ecmaVersion >= 7 &&
          42 === e &&
          42 === t &&
          (++s, (i = Xo.starstar), (t = this.input.charCodeAt(this.pos + 2))),
        61 === t ? this.finishOp(Xo.assign, s + 1) : this.finishOp(i, s)
      )
    }),
    (il.readToken_pipe_amp = function (e) {
      var t = this.input.charCodeAt(this.pos + 1)
      return t === e
        ? this.finishOp(124 === e ? Xo.logicalOR : Xo.logicalAND, 2)
        : 61 === t
          ? this.finishOp(Xo.assign, 2)
          : this.finishOp(124 === e ? Xo.bitwiseOR : Xo.bitwiseAND, 1)
    }),
    (il.readToken_caret = function () {
      return 61 === this.input.charCodeAt(this.pos + 1)
        ? this.finishOp(Xo.assign, 2)
        : this.finishOp(Xo.bitwiseXOR, 1)
    }),
    (il.readToken_plus_min = function (e) {
      var t = this.input.charCodeAt(this.pos + 1)
      return t === e
        ? 45 !== t ||
          this.inModule ||
          62 !== this.input.charCodeAt(this.pos + 2) ||
          (0 !== this.lastTokEnd && !Yo.test(this.input.slice(this.lastTokEnd, this.pos)))
          ? this.finishOp(Xo.incDec, 2)
          : (this.skipLineComment(3), this.skipSpace(), this.nextToken())
        : 61 === t
          ? this.finishOp(Xo.assign, 2)
          : this.finishOp(Xo.plusMin, 1)
    }),
    (il.readToken_lt_gt = function (e) {
      var t = this.input.charCodeAt(this.pos + 1),
        s = 1
      return t === e
        ? ((s = 62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2),
          61 === this.input.charCodeAt(this.pos + s)
            ? this.finishOp(Xo.assign, s + 1)
            : this.finishOp(Xo.bitShift, s))
        : 33 !== t ||
            60 !== e ||
            this.inModule ||
            45 !== this.input.charCodeAt(this.pos + 2) ||
            45 !== this.input.charCodeAt(this.pos + 3)
          ? (61 === t && (s = 2), this.finishOp(Xo.relational, s))
          : (this.skipLineComment(4), this.skipSpace(), this.nextToken())
    }),
    (il.readToken_eq_excl = function (e) {
      var t = this.input.charCodeAt(this.pos + 1)
      return 61 === t
        ? this.finishOp(Xo.equality, 61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2)
        : 61 === e && 62 === t && this.options.ecmaVersion >= 6
          ? ((this.pos += 2), this.finishToken(Xo.arrow))
          : this.finishOp(61 === e ? Xo.eq : Xo.prefix, 1)
    }),
    (il.getTokenFromCode = function (e) {
      switch (e) {
        case 46:
          return this.readToken_dot()
        case 40:
          return ++this.pos, this.finishToken(Xo.parenL)
        case 41:
          return ++this.pos, this.finishToken(Xo.parenR)
        case 59:
          return ++this.pos, this.finishToken(Xo.semi)
        case 44:
          return ++this.pos, this.finishToken(Xo.comma)
        case 91:
          return ++this.pos, this.finishToken(Xo.bracketL)
        case 93:
          return ++this.pos, this.finishToken(Xo.bracketR)
        case 123:
          return ++this.pos, this.finishToken(Xo.braceL)
        case 125:
          return ++this.pos, this.finishToken(Xo.braceR)
        case 58:
          return ++this.pos, this.finishToken(Xo.colon)
        case 63:
          return ++this.pos, this.finishToken(Xo.question)
        case 96:
          if (this.options.ecmaVersion < 6) break
          return ++this.pos, this.finishToken(Xo.backQuote)
        case 48:
          var t = this.input.charCodeAt(this.pos + 1)
          if (120 === t || 88 === t) return this.readRadixNumber(16)
          if (this.options.ecmaVersion >= 6) {
            if (111 === t || 79 === t) return this.readRadixNumber(8)
            if (98 === t || 66 === t) return this.readRadixNumber(2)
          }
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          return this.readNumber(!1)
        case 34:
        case 39:
          return this.readString(e)
        case 47:
          return this.readToken_slash()
        case 37:
        case 42:
          return this.readToken_mult_modulo_exp(e)
        case 124:
        case 38:
          return this.readToken_pipe_amp(e)
        case 94:
          return this.readToken_caret()
        case 43:
        case 45:
          return this.readToken_plus_min(e)
        case 60:
        case 62:
          return this.readToken_lt_gt(e)
        case 61:
        case 33:
          return this.readToken_eq_excl(e)
        case 126:
          return this.finishOp(Xo.prefix, 1)
      }
      this.raise(this.pos, "Unexpected character '" + nl(e) + "'")
    }),
    (il.finishOp = function (e, t) {
      var s = this.input.slice(this.pos, this.pos + t)
      return (this.pos += t), this.finishToken(e, s)
    }),
    (il.readRegexp = function () {
      for (var e, t, s = this.pos; ; ) {
        this.pos >= this.input.length && this.raise(s, 'Unterminated regular expression')
        var i = this.input.charAt(this.pos)
        if ((Yo.test(i) && this.raise(s, 'Unterminated regular expression'), e)) e = !1
        else {
          if ('[' === i) t = !0
          else if (']' === i && t) t = !1
          else if ('/' === i && !t) break
          e = '\\' === i
        }
        ++this.pos
      }
      var n = this.input.slice(s, this.pos)
      ++this.pos
      var r = this.pos,
        a = this.readWord1()
      this.containsEsc && this.unexpected(r)
      var o = this.regexpState || (this.regexpState = new Hh(this))
      o.reset(s, n, a), this.validateRegExpFlags(o), this.validateRegExpPattern(o)
      var h = null
      try {
        h = new RegExp(n, a)
      } catch (e) {}
      return this.finishToken(Xo.regexp, { pattern: n, flags: a, value: h })
    }),
    (il.readInt = function (e, t) {
      for (var s = this.pos, i = 0, n = 0, r = null == t ? 1 / 0 : t; n < r; ++n) {
        var a = this.input.charCodeAt(this.pos),
          o = void 0
        if (
          (o =
            a >= 97 ? a - 97 + 10 : a >= 65 ? a - 65 + 10 : a >= 48 && a <= 57 ? a - 48 : 1 / 0) >=
          e
        )
          break
        ++this.pos, (i = i * e + o)
      }
      return this.pos === s || (null != t && this.pos - s !== t) ? null : i
    }),
    (il.readRadixNumber = function (e) {
      var t = this.pos
      this.pos += 2
      var s = this.readInt(e)
      return (
        null == s && this.raise(this.start + 2, 'Expected number in radix ' + e),
        this.options.ecmaVersion >= 11 && 110 === this.input.charCodeAt(this.pos)
          ? ((s = 'undefined' != typeof BigInt ? BigInt(this.input.slice(t, this.pos)) : null),
            ++this.pos)
          : Wo(this.fullCharCodeAtPos()) &&
            this.raise(this.pos, 'Identifier directly after number'),
        this.finishToken(Xo.num, s)
      )
    }),
    (il.readNumber = function (e) {
      var t = this.pos
      e || null !== this.readInt(10) || this.raise(t, 'Invalid number')
      var s = this.pos - t >= 2 && 48 === this.input.charCodeAt(t)
      s && this.strict && this.raise(t, 'Invalid number')
      var i = this.input.charCodeAt(this.pos)
      if (!s && !e && this.options.ecmaVersion >= 11 && 110 === i) {
        var n = this.input.slice(t, this.pos),
          r = 'undefined' != typeof BigInt ? BigInt(n) : null
        return (
          ++this.pos,
          Wo(this.fullCharCodeAtPos()) && this.raise(this.pos, 'Identifier directly after number'),
          this.finishToken(Xo.num, r)
        )
      }
      s && /[89]/.test(this.input.slice(t, this.pos)) && (s = !1),
        46 !== i || s || (++this.pos, this.readInt(10), (i = this.input.charCodeAt(this.pos))),
        (69 !== i && 101 !== i) ||
          s ||
          ((43 !== (i = this.input.charCodeAt(++this.pos)) && 45 !== i) || ++this.pos,
          null === this.readInt(10) && this.raise(t, 'Invalid number')),
        Wo(this.fullCharCodeAtPos()) && this.raise(this.pos, 'Identifier directly after number')
      var a = this.input.slice(t, this.pos),
        o = s ? parseInt(a, 8) : parseFloat(a)
      return this.finishToken(Xo.num, o)
    }),
    (il.readCodePoint = function () {
      var e
      if (123 === this.input.charCodeAt(this.pos)) {
        this.options.ecmaVersion < 6 && this.unexpected()
        var t = ++this.pos
        ;(e = this.readHexChar(this.input.indexOf('}', this.pos) - this.pos)),
          ++this.pos,
          e > 1114111 && this.invalidStringToken(t, 'Code point out of bounds')
      } else e = this.readHexChar(4)
      return e
    }),
    (il.readString = function (e) {
      for (var t = '', s = ++this.pos; ; ) {
        this.pos >= this.input.length && this.raise(this.start, 'Unterminated string constant')
        var i = this.input.charCodeAt(this.pos)
        if (i === e) break
        92 === i
          ? ((t += this.input.slice(s, this.pos)), (t += this.readEscapedChar(!1)), (s = this.pos))
          : (Jo(i, this.options.ecmaVersion >= 10) &&
              this.raise(this.start, 'Unterminated string constant'),
            ++this.pos)
      }
      return (t += this.input.slice(s, this.pos++)), this.finishToken(Xo.string, t)
    })
  var rl = {}
  ;(il.tryReadTemplateToken = function () {
    this.inTemplateElement = !0
    try {
      this.readTmplToken()
    } catch (e) {
      if (e !== rl) throw e
      this.readInvalidTemplateToken()
    }
    this.inTemplateElement = !1
  }),
    (il.invalidStringToken = function (e, t) {
      if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw rl
      this.raise(e, t)
    }),
    (il.readTmplToken = function () {
      for (var e = '', t = this.pos; ; ) {
        this.pos >= this.input.length && this.raise(this.start, 'Unterminated template')
        var s = this.input.charCodeAt(this.pos)
        if (96 === s || (36 === s && 123 === this.input.charCodeAt(this.pos + 1)))
          return this.pos !== this.start ||
            (this.type !== Xo.template && this.type !== Xo.invalidTemplate)
            ? ((e += this.input.slice(t, this.pos)), this.finishToken(Xo.template, e))
            : 36 === s
              ? ((this.pos += 2), this.finishToken(Xo.dollarBraceL))
              : (++this.pos, this.finishToken(Xo.backQuote))
        if (92 === s)
          (e += this.input.slice(t, this.pos)), (e += this.readEscapedChar(!0)), (t = this.pos)
        else if (Jo(s)) {
          switch (((e += this.input.slice(t, this.pos)), ++this.pos, s)) {
            case 13:
              10 === this.input.charCodeAt(this.pos) && ++this.pos
            case 10:
              e += '\n'
              break
            default:
              e += String.fromCharCode(s)
          }
          this.options.locations && (++this.curLine, (this.lineStart = this.pos)), (t = this.pos)
        } else ++this.pos
      }
    }),
    (il.readInvalidTemplateToken = function () {
      for (; this.pos < this.input.length; this.pos++)
        switch (this.input[this.pos]) {
          case '\\':
            ++this.pos
            break
          case '$':
            if ('{' !== this.input[this.pos + 1]) break
          case '`':
            return this.finishToken(Xo.invalidTemplate, this.input.slice(this.start, this.pos))
        }
      this.raise(this.start, 'Unterminated template')
    }),
    (il.readEscapedChar = function (e) {
      var t = this.input.charCodeAt(++this.pos)
      switch ((++this.pos, t)) {
        case 110:
          return '\n'
        case 114:
          return '\r'
        case 120:
          return String.fromCharCode(this.readHexChar(2))
        case 117:
          return nl(this.readCodePoint())
        case 116:
          return '\t'
        case 98:
          return '\b'
        case 118:
          return '\v'
        case 102:
          return '\f'
        case 13:
          10 === this.input.charCodeAt(this.pos) && ++this.pos
        case 10:
          return this.options.locations && ((this.lineStart = this.pos), ++this.curLine), ''
        case 56:
        case 57:
          if (e) {
            var s = this.pos - 1
            return this.invalidStringToken(s, 'Invalid escape sequence in template string'), null
          }
        default:
          if (t >= 48 && t <= 55) {
            var i = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
              n = parseInt(i, 8)
            return (
              n > 255 && ((i = i.slice(0, -1)), (n = parseInt(i, 8))),
              (this.pos += i.length - 1),
              (t = this.input.charCodeAt(this.pos)),
              ('0' === i && 56 !== t && 57 !== t) ||
                (!this.strict && !e) ||
                this.invalidStringToken(
                  this.pos - 1 - i.length,
                  e ? 'Octal literal in template string' : 'Octal literal in strict mode'
                ),
              String.fromCharCode(n)
            )
          }
          return Jo(t) ? '' : String.fromCharCode(t)
      }
    }),
    (il.readHexChar = function (e) {
      var t = this.pos,
        s = this.readInt(16, e)
      return null === s && this.invalidStringToken(t, 'Bad character escape sequence'), s
    }),
    (il.readWord1 = function () {
      this.containsEsc = !1
      for (
        var e = '', t = !0, s = this.pos, i = this.options.ecmaVersion >= 6;
        this.pos < this.input.length;

      ) {
        var n = this.fullCharCodeAtPos()
        if (Uo(n, i)) this.pos += n <= 65535 ? 1 : 2
        else {
          if (92 !== n) break
          ;(this.containsEsc = !0), (e += this.input.slice(s, this.pos))
          var r = this.pos
          117 !== this.input.charCodeAt(++this.pos) &&
            this.invalidStringToken(this.pos, 'Expecting Unicode escape sequence \\uXXXX'),
            ++this.pos
          var a = this.readCodePoint()
          ;(t ? Wo : Uo)(a, i) || this.invalidStringToken(r, 'Invalid Unicode escape'),
            (e += nl(a)),
            (s = this.pos)
        }
        t = !1
      }
      return e + this.input.slice(s, this.pos)
    }),
    (il.readWord = function () {
      var e = this.readWord1(),
        t = Xo.name
      return this.keywords.test(e) && (t = qo[e]), this.finishToken(t, e)
    })
  function al(e, { enter: t, leave: s }) {
    return (function e(t, s, i, n, r, a) {
      if (t) {
        if (i) {
          const e = ol,
            n = hl,
            o = ll
          ;(ol = !1),
            (hl = !1),
            (ll = null),
            i.call(cl, t, s, r, a),
            ll && pl(s, r, a, (t = ll)),
            hl && dl(s, r, a)
          const h = ol,
            l = hl
          if (((ol = e), (hl = n), (ll = o), h)) return t
          if (l) return null
        }
        const o =
          (t.type && ul[t.type]) ||
          (ul[t.type] = Object.keys(t).filter((e) => 'object' == typeof t[e]))
        for (let s = 0; s < o.length; s += 1) {
          const r = o[s],
            a = t[r]
          if (Array.isArray(a))
            for (let s = 0, o = 0; s < a.length; s += 1, o += 1)
              a[s] && a[s].type && (e(a[s], t, i, n, r, o) || s--)
          else a && a.type && e(a, t, i, n, r, null)
        }
        if (n) {
          const e = ll,
            i = hl
          ;(ll = null),
            (hl = !1),
            n.call(cl, t, s, r, a),
            ll && pl(s, r, a, (t = ll)),
            hl && dl(s, r, a)
          const o = hl
          if (((ll = e), (hl = i), o)) return null
        }
      }
      return t
    })(e, null, t, s)
  }
  dh.acorn = {
    Parser: dh,
    version: '7.1.0',
    defaultOptions: ch,
    Position: oh,
    SourceLocation: hh,
    getLineInfo: lh,
    Node: Nh,
    TokenType: jo,
    tokTypes: Xo,
    keywordTypes: qo,
    TokContext: Mh,
    tokContexts: Rh,
    isIdentifierChar: Uo,
    isIdentifierStart: Wo,
    Token: sl,
    isNewLine: Jo,
    lineBreak: Yo,
    lineBreakG: Qo,
    nonASCIIwhitespace: Zo
  }
  let ol = !1,
    hl = !1,
    ll = null
  const cl = { skip: () => (ol = !0), remove: () => (hl = !0), replace: (e) => (ll = e) },
    ul = {}
  function pl(e, t, s, i) {
    e && (null !== s ? (e[t][s] = i) : (e[t] = i))
  }
  function dl(e, t, s) {
    e && (null !== s ? e[t].splice(s, 1) : delete e[t])
  }
  const fl =
    'function require(id) {\n\tif (id in __repl_lookup) return __repl_lookup[id];\n\tthrow new Error(`Cannot require modules dynamically (${id})`);\n}'
  var ml = {
      name: 'commonjs',
      transform: (e, t) => {
        if (/\b(require|module|exports)\b/.test(e))
          try {
            const t = dh.parse(e, { ecmaVersion: 9 }),
              s = []
            return (
              al(t, {
                enter: (e) => {
                  if ('CallExpression' === e.type && 'require' === e.callee.name) {
                    if (1 !== e.arguments.length) return
                    const t = e.arguments[0]
                    if ('Literal' !== t.type || 'string' != typeof t.value) return
                    s.push(t.value)
                  }
                }
              }),
              {
                code: [
                  s.map((e, t) => `import __repl_${t} from '${e}';`).join('\n'),
                  `const __repl_lookup = { ${s.map((e, t) => `'${e}': __repl_${t}`).join(', ')} };`,
                  fl,
                  'const exports = {}; const module = { exports };',
                  e,
                  'export default module.exports;'
                ].join('\n\n'),
                map: null
              }
            )
          } catch (e) {
            return null
          }
      }
    },
    gl = {
      name: 'glsl',
      transform: (e, t) => {
        if (t.endsWith('.glsl')) return { code: `export default ${JSON.stringify(e)};`, map: null }
      }
    },
    yl = {
      name: 'json',
      transform: (e, t) => {
        if (t.endsWith('.json')) return { code: `export default ${e};`, map: null }
      }
    }
  let xl, vl, El
  ;(self.window = self),
    self.addEventListener('message', (e) => {
      switch (e.data.type) {
        case 'init':
          ;(xl = e.data.packagesUrl), (vl = e.data.svelteUrl), importScripts(vl + '/compiler.js')
          break
        case 'bundle':
          const { uid: t, components: s } = e.data
          if (0 === s.length) return
          ;(El = t),
            setTimeout(async () => {
              if (El !== t) return
              const e = await (async function ({ uid: e, components: t }) {
                console.clear(),
                  console.log(
                    'running Svelte compiler version %c' + svelte.VERSION,
                    'font-weight: bold'
                  )
                const s = {}
                let i
                t.forEach((e) => {
                  const t = `./${e.name}.${e.type}`
                  s[t] = e
                })
                try {
                  if (((i = await Pl(e, 'dom', bl.dom, s)), i.error)) throw i.error
                  bl.dom = i.cache
                  const t = (
                      await i.bundle.generate({
                        format: 'iife',
                        name: 'SvelteComponent',
                        exports: 'named',
                        sourcemap: !0
                      })
                    ).output[0],
                    n = null,
                    r = n
                      ? (
                          await n.bundle.generate({
                            format: 'iife',
                            name: 'SvelteComponent',
                            exports: 'named',
                            sourcemap: !0
                          })
                        ).output[0]
                      : null
                  return {
                    uid: e,
                    dom: t,
                    ssr: r,
                    imports: i.imports,
                    warnings: i.warnings,
                    error: null
                  }
                } catch (t) {
                  console.error(t)
                  const s = t
                  return (
                    delete s.toString,
                    {
                      uid: e,
                      dom: null,
                      ssr: null,
                      imports: null,
                      warnings: i.warnings,
                      error: Object.assign({}, s, { message: s.message, stack: s.stack })
                    }
                  )
                }
              })({ uid: t, components: s })
              e.error !== Sl && e && t === El && postMessage(e)
            })
      }
    })
  let bl = { dom: {}, ssr: {} }
  const Sl = { aborted: !0 },
    _l = new Map()
  function Al(e) {
    if (_l.has(e)) return _l.get(e)
    const t = fetch(e)
      .then(async (e) => {
        if (e.ok) return { url: e.url, body: await e.text() }
        throw new Error(await e.text())
      })
      .catch((t) => {
        throw (_l.delete(e), t)
      })
    return _l.set(e, t), t
  }
  async function kl(e) {
    return (await Al(e)).url
  }
  function Cl(e, t, s) {
    const i = svelte.VERSION.match(/^(\d+)\.(\d+)\.(\d+)/)
    return i[1] - e || i[2] - t || i[3] - s
  }
  function wl() {
    return Cl(3, 4, 4) <= 0
  }
  async function Pl(e, t, s, i) {
    let n
    const r = new Set(),
      a = [],
      o = [],
      h = {},
      l = {
        async resolveId(t, s) {
          if (e !== El) throw Sl
          if ('svelte' === t) return vl + '/index.mjs'
          if (t.startsWith('svelte/'))
            return wl() ? `${vl}/${t.slice(7)}.mjs` : `${vl}/${t.slice(7)}/index.mjs`
          if (s && s.startsWith(vl)) {
            const e = new URL(t, s).href
            return e.endsWith('.mjs') ? e : wl() ? e + '.mjs' : e + '/index.mjs'
          }
          if (t in i) return t
          if (t + '.js' in i) return t + '.js'
          if (t + '.json' in i) return t + '.json'
          if (
            (t.endsWith('/') && (t = t.slice(0, -1)),
            t.startsWith('http:') || t.startsWith('https:'))
          )
            return t
          if (t.startsWith('.')) {
            const i = new URL(t, s).href
            return (
              self.postMessage({ type: 'status', uid: e, message: 'resolving ' + i }), await kl(i)
            )
          }
          if ((self.postMessage({ type: 'status', uid: e, message: 'resolving ' + t }), s in i)) {
            const e = /^(@[^/]+\/)?[^/]+/.exec(t)
            e && r.add(e[0])
          }
          try {
            const e = await kl(`${xl}/${t}/package.json`),
              s = (await Al(e)).body,
              i = JSON.parse(s)
            if (i.svelte || i.module || i.main) {
              const t = e.replace(/\/package\.json$/, '')
              return new URL(i.svelte || i.module || i.main, t + '/').href
            }
          } catch (e) {}
          return await kl(`${xl}/${t}`)
        },
        async load(t) {
          if (e !== El) throw Sl
          if (t in i) return i[t].source
          return (
            _l.has(t) || self.postMessage({ type: 'status', uid: e, message: 'fetching ' + t }),
            (await Al(t)).body
          )
        },
        transform(i, n) {
          if (e !== El) throw Sl
          if (
            (self.postMessage({ type: 'status', uid: e, message: 'bundling ' + n }),
            !/\.svelte$/.test(n))
          )
            return null
          const r = n.split('/').pop().split('.')[0],
            o =
              s[n] && s[n].code === i
                ? s[n].result
                : svelte.compile(
                    i,
                    Object.assign(
                      { generate: t, format: 'esm', dev: !0, filename: r + '.svelte' },
                      Cl(3, 14, 0) >= 0 && { loopGuardTimeout: 100 }
                    )
                  )
          return (
            (h[n] = { code: i, result: o }),
            (o.warnings || o.stats.warnings).forEach((e) => {
              a.push({ message: e.message, filename: e.filename, start: e.start, end: e.end })
            }),
            o.js
          )
        }
      }
    try {
      return (
        (n = await Ao({
          input: './App.svelte',
          plugins: [l, ml, yl, gl],
          inlineDynamicImports: !0,
          onwarn(e) {
            o.push({ message: e.message })
          }
        })),
        { bundle: n, imports: Array.from(r), cache: h, error: null, warnings: a, all_warnings: o }
      )
    } catch (e) {
      return { error: e, imports: null, bundle: null, cache: h, warnings: a, all_warnings: o }
    }
  }
})()
