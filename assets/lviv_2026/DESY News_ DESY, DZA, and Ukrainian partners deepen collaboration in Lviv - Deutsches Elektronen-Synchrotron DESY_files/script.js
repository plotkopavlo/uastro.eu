var zmiParams = {};
$(function(){
	// Parse params (?) and pseudo-params (#).
	var href = self.location.href;
	var base_url = href;
	var delimiter_list = ['?','#'];
	for (var h = 0; h < delimiter_list.length; h++) {
		var delimiter = delimiter_list[h];
		var i = base_url.indexOf(delimiter);
		if (i > 0) {
			base_url = base_url.substr(0,i);
		}
		var i = href.indexOf(delimiter);
		if (i > 0) {
			var query_string = href.substr(i+1);
			if (h < delimiter_list.length-1) {
				i = query_string.indexOf(delimiter_list[h+1]);
				if (i > 0) {
					query_string = query_string.substr(0,i);
				}
			}
			var l = query_string.split('&');
			for ( var j = 0; j < l.length; j++) {
				i = l[j].indexOf('=');
				if (i < 0) {
					break;
				}
				if (typeof zmiParams[l[j].substr(0,i)] == "undefined") {
					zmiParams[l[j].substr(0,i)] = unescape(l[j].substr(i+1));
				}
			}
		}
	}
	zmiParams['base_url'] = base_url;
});


////////////////////////////////////////////////////////////////////////////////
/// ZMS
////////////////////////////////////////////////////////////////////////////////

/**
 * Returns language.
 */
function getLang() {
	return $("#lang").text();
}

/**
 * Returns language-string.
 */
var langStr = {}
function getLangStr(key, lang) {
	var data = {key:key,lang:lang};
	if (typeof langStr[key] == 'undefined') {
		langStr[key] = $.ajax({
			url: 'getLangStr',
			data: data,
			datatype: 'text',
			async: false
			}).responseText;
	}
	return langStr[key];
}

////////////////////////////////////////////////////////////////////////////////
/// Pagination
////////////////////////////////////////////////////////////////////////////////

/**
 * Get pagination.
 *
 * @param fn the function to assemble url for page-index.
 * @param size the total number of records.
 * @param pageSize the number of records on each page.
 * @param pageIndex the index of the current-page.
 */
function GetPagination(fn, size, pageSize, pageIndex) {
  var html = '';
  if (size > pageSize) {
    var pageCount = Math.floor(((size-1)/pageSize)+1);
    html += ''
      + '<ul class="pagination">';
    html += ''
      + '<li class="'+(pageIndex==0?"disabled":"")+'">'
      + '<a href="'+(pageIndex==0?'javascript:;':fn(pageIndex-1))+'">&laquo;</span></a>'
      + '</li>';
    for (var page = 0; page < pageCount; page++) {
      if (pageCount>=10 && page==pageCount-1 && pageIndex<pageCount-(3+1)-1) {
        html += '<li class="disabled"><span>...</span></li>';
      }
      if (pageCount<10 || (page==0) || (page>=pageIndex-3 && page<=pageIndex+3) || (page==pageCount-1)) {
        html += ''
          + '<li class="' + (pageIndex==page?"active":"") + '">'
          + '<a href="'+(pageIndex==page?'javascript:;':fn(page))+'">'+(page+1)+'</a>'
          + '</li>';
      }
      if (pageCount>=10 && page==0 && pageIndex>(3+1)) {
        html += '<li class="disabled"><span>...</span></li>';
      } 
    }
    html += ''
      + '<li class="last' + (pageIndex==pageCount-1?" disabled":"") + '">'
      + '<a href="'+(pageIndex==pageCount-1?'javascript:;':fn(pageIndex+1))+'">&raquo;</span></a>'
      + '</li>'
      + '</ul><!-- .pagination -->';
  }
  $(".pagination").replaceWith(html);
}


////////////////////////////////////////////////////////////////////////////////
/// Write
////////////////////////////////////////////////////////////////////////////////

function writeDebug(s,b) {
	if ($("#debug").css("display")!="none" || (typeof b != "undefined" && b)) {
		$("#debug").val("["+(new Date())+"] "+s+"\n"+$("#debug").val());
	}
}

function writeSystemMsg(system_msg) {
	$('div#local_msg').html(system_msg+" ("+(new Date())+")");
	$('div#local_msg').show();
	window.scrollTo(0,0);
	window.setTimeout("$('div#local_msg').hide('slow')",5000);
}

function setProgressbox(selector) {
	$(selector).html(
		'<'+'div>'
			+ '<'+'img src="/misc_/zms/loading_16x16.gif" alt="Loading..." title="'+getLangStr('MSG_LOADING',getLang())+'" border="0" align="absmiddle"/> '
			+ getLangStr('MSG_LOADING',getLang())
		+ '<'+'/div>');
}